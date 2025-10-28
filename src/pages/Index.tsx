import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Listing {
  id: number;
  title: string;
  description: string;
  category: string;
  price?: string;
  location: string;
  date: string;
}

const recentListings: Listing[] = [
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
  }
];

const Index = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Объявление создано',
      description: 'Ваше объявление опубликовано и ожидает модерации'
    });
    setIsDialogOpen(false);
    setFormData({ title: '', description: '', category: '', price: '', location: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Icon name="MessageSquare" size={24} />
            <span>Объявления</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground">
              Главная
            </Link>
            <Link to="/listings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Объявления
            </Link>
            <Link to="/rules" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Правила
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-gradient-to-b from-background to-secondary/20 py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Платформа объявлений
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Покупайте, продавайте, находите услуги и делитесь с сообществом
            </p>
            <div className="flex items-center justify-center gap-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2">
                    <Icon name="Plus" size={20} />
                    Разместить объявление
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Новое объявление</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="title">Заголовок</Label>
                      <Input
                        id="title"
                        placeholder="Краткое описание товара или услуги"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        placeholder="Подробное описание..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={5}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Категория</Label>
                        <Input
                          id="category"
                          placeholder="Электроника, Услуги..."
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Цена (необязательно)</Label>
                        <Input
                          id="price"
                          placeholder="10 000 ₽"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="location">Местоположение</Label>
                      <Input
                        id="location"
                        placeholder="Город"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        Опубликовать
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Отмена
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              <Link to="/listings">
                <Button size="lg" variant="outline">
                  Смотреть объявления
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Быстро</h3>
                <p className="text-muted-foreground">
                  Создавайте и публикуйте объявления за минуты
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Безопасно</h3>
                <p className="text-muted-foreground">
                  Все объявления проходят модерацию
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Сообщество</h3>
                <p className="text-muted-foreground">
                  Тысячи пользователей каждый день
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-foreground">Последние объявления</h2>
              <Link to="/listings">
                <Button variant="ghost" className="gap-2">
                  Смотреть все
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid gap-4">
              {recentListings.map((listing) => (
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
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Готовы начать?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Присоединяйтесь к тысячам пользователей, которые уже используют нашу платформу
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="gap-2">
                  <Icon name="Plus" size={20} />
                  Разместить объявление бесплатно
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 Платформа объявлений. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
