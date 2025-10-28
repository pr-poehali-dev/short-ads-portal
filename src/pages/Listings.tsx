import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Listing {
  id: number;
  title: string;
  description: string;
  category: string;
  price?: string;
  location: string;
  date: string;
}

const mockListings: Listing[] = [
  {
    id: 1,
    title: 'iPhone 14 Pro в отличном состоянии',
    description: 'Продаю iPhone 14 Pro 256GB, Space Black. Состояние идеальное, всегда в чехле.',
    category: 'Электроника',
    price: '85 000 ₽',
    location: 'Москва',
    date: '2 часа назад'
  },
  {
    id: 2,
    title: 'Ищу репетитора по английскому',
    description: 'Требуется репетитор для подготовки к IELTS. Уровень intermediate.',
    category: 'Услуги',
    location: 'Санкт-Петербург',
    date: '5 часов назад'
  },
  {
    id: 3,
    title: 'Диван-кровать IKEA',
    description: 'Продаю диван-кровать в отличном состоянии. Серый цвет, механизм работает идеально.',
    category: 'Мебель',
    price: '15 000 ₽',
    location: 'Москва',
    date: '1 день назад'
  },
  {
    id: 4,
    title: 'Отдам котёнка в добрые руки',
    description: 'Рыжий котёнок, 3 месяца, приучен к лотку. Очень ласковый и игривый.',
    category: 'Животные',
    location: 'Казань',
    date: '2 дня назад'
  },
  {
    id: 5,
    title: 'Велосипед горный Trek',
    description: 'Горный велосипед Trek Marlin 7, рама 18", колёса 29". Отличное состояние.',
    category: 'Спорт',
    price: '35 000 ₽',
    location: 'Новосибирск',
    date: '3 дня назад'
  },
  {
    id: 6,
    title: 'Услуги программиста',
    description: 'Создание сайтов, веб-приложений, автоматизация. React, TypeScript, Python.',
    category: 'Услуги',
    location: 'Удалённо',
    date: '1 неделю назад'
  }
];

const categories = ['Все', 'Электроника', 'Услуги', 'Мебель', 'Животные', 'Спорт'];

const Listings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Icon name="MessageSquare" size={24} />
            <span>Объявления</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Главная
            </Link>
            <Link to="/listings" className="text-sm font-medium text-foreground">
              Объявления
            </Link>
            <Link to="/rules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Правила
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Все объявления</h1>
          <p className="text-muted-foreground">Найдено {filteredListings.length} объявлений</p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск объявлений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{listing.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {listing.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{listing.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={16} />
                        <span>{listing.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Clock" size={16} />
                        <span>{listing.date}</span>
                      </div>
                    </div>
                  </div>
                  {listing.price && (
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">{listing.price}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Объявления не найдены</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Listings;
