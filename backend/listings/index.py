import json
import os
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, ValidationError
import psycopg2
from psycopg2.extras import RealDictCursor

class ListingCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = Field(..., min_length=1)
    category: str = Field(..., min_length=1, max_length=100)
    price: Optional[str] = Field(None, max_length=50)
    location: str = Field(..., min_length=1, max_length=100)

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError('DATABASE_URL environment variable is not set')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage listings (create, read, list) for the ads platform
    Args: event with httpMethod, body, queryStringParameters
          context with request_id attribute
    Returns: HTTP response with statusCode, headers, body
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters') or {}
            search = query_params.get('search', '')
            category = query_params.get('category', '')
            
            query = '''
                SELECT id, title, description, category, price, location,
                       created_at,
                       CASE
                           WHEN created_at > NOW() - INTERVAL '1 hour' THEN 
                               EXTRACT(EPOCH FROM (NOW() - created_at))::int || ' минут назад'
                           WHEN created_at > NOW() - INTERVAL '1 day' THEN
                               EXTRACT(EPOCH FROM (NOW() - created_at))::int / 3600 || ' часов назад'
                           WHEN created_at > NOW() - INTERVAL '7 days' THEN
                               EXTRACT(EPOCH FROM (NOW() - created_at))::int / 86400 || ' дней назад'
                           ELSE
                               EXTRACT(EPOCH FROM (NOW() - created_at))::int / 604800 || ' недель назад'
                       END as date
                FROM t_p21054397_short_ads_portal.listings
                WHERE 1=1
            '''
            params = []
            
            if search:
                query += " AND (title ILIKE %s OR description ILIKE %s)"
                search_pattern = f'%{search}%'
                params.extend([search_pattern, search_pattern])
            
            if category and category != 'Все':
                query += " AND category = %s"
                params.append(category)
            
            query += " ORDER BY created_at DESC LIMIT 100"
            
            cursor.execute(query, params)
            listings = cursor.fetchall()
            
            result = []
            for row in listings:
                result.append({
                    'id': row['id'],
                    'title': row['title'],
                    'description': row['description'],
                    'category': row['category'],
                    'price': row['price'],
                    'location': row['location'],
                    'date': row['date']
                })
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps(result, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            listing_data = ListingCreate(**body_data)
            
            cursor.execute('''
                INSERT INTO t_p21054397_short_ads_portal.listings 
                (title, description, category, price, location)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id, title, description, category, price, location, created_at
            ''', (
                listing_data.title,
                listing_data.description,
                listing_data.category,
                listing_data.price,
                listing_data.location
            ))
            
            new_listing = cursor.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({
                    'id': new_listing['id'],
                    'title': new_listing['title'],
                    'description': new_listing['description'],
                    'category': new_listing['category'],
                    'price': new_listing['price'],
                    'location': new_listing['location'],
                    'created_at': new_listing['created_at'].isoformat()
                }, ensure_ascii=False),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}, ensure_ascii=False),
            'isBase64Encoded': False
        }
    
    finally:
        cursor.close()
        conn.close()
