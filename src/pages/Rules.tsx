import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

const Rules = () => {
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
            <Link to="/listings" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Объявления
            </Link>
            <Link to="/rules" className="text-sm font-medium text-foreground">
              Правила
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Правила сервиса</h1>
          <p className="text-lg text-muted-foreground">
            Пожалуйста, ознакомьтесь с правилами размещения объявлений
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon name="CheckCircle" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Разрешено</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Размещать объявления о продаже товаров и услуг</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Искать товары, услуги или работу</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Размещать объявления о поиске домашних животных</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Использовать понятные заголовки и подробные описания</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Указывать реальную цену и местоположение</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-destructive/10 rounded-lg">
                  <Icon name="XCircle" size={24} className="text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Запрещено</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Размещать незаконные товары и услуги</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Использовать нецензурную лексику и оскорбления</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Публиковать спам и рекламу сомнительных сервисов</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Дублировать объявления более 3 раз в день</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive mt-1">•</span>
                      <span>Указывать заведомо ложную информацию</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon name="Shield" size={24} className="text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Безопасность</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Не передавайте личные данные незнакомым людям</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Встречайтесь для сделок в общественных местах</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Проверяйте товары перед оплатой</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Не отправляйте предоплату незнакомым людям</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span>При подозрительной активности свяжитесь с администрацией</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <Icon name="Info" size={24} className="text-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Модерация</h2>
                  <p className="text-muted-foreground mb-3">
                    Все объявления проходят автоматическую и ручную модерацию. 
                    Объявления, нарушающие правила, будут удалены без предупреждения.
                  </p>
                  <p className="text-muted-foreground">
                    За систематические нарушения пользователь может быть заблокирован.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-muted-foreground mb-4">
              Соблюдая эти простые правила, вы помогаете создавать безопасное и комфортное пространство для всех пользователей.
            </p>
            <p className="text-sm text-muted-foreground">
              По вопросам обращайтесь: <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Rules;
