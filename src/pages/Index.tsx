import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const products: Product[] = [
    {
      id: 1,
      title: 'Velvet Touch',
      price: 12900,
      category: 'Premium Collection',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&q=80',
    },
    {
      id: 2,
      title: 'Silk Essence',
      price: 15900,
      category: 'Luxury Series',
      image: 'https://images.unsplash.com/photo-1596558450255-7c0b7be9d56a?w=500&q=80',
    },
    {
      id: 3,
      title: 'Diamond Rose',
      price: 18900,
      category: 'Premium Collection',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=500&q=80',
    },
    {
      id: 4,
      title: 'Gold Edition',
      price: 24900,
      category: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80',
    },
    {
      id: 5,
      title: 'Pearl Deluxe',
      price: 19900,
      category: 'Luxury Series',
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?w=500&q=80',
    },
    {
      id: 6,
      title: 'Crystal Night',
      price: 16900,
      category: 'Premium Collection',
      image: 'https://images.unsplash.com/photo-1591361180867-f37c5e3b9d45?w=500&q=80',
    },
    {
      id: 7,
      title: 'Platinum Dream',
      price: 29900,
      category: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80',
    },
    {
      id: 8,
      title: 'Satin Luxe',
      price: 14900,
      category: 'Luxury Series',
      image: 'https://images.unsplash.com/photo-1602810320073-1230c46d89b4?w=500&q=80',
    },
    {
      id: 9,
      title: 'Obsidian Elite',
      price: 21900,
      category: 'Premium Collection',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
    },
    {
      id: 10,
      title: 'Royal Noir',
      price: 26900,
      category: 'Exclusive',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&q=80',
    },
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success('Товар добавлен в корзину');
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            LUXORIA
          </h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative border-primary/20 hover:border-primary">
                <Icon name="ShoppingBag" className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-playfair text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                ) : (
                  <>
                    {cart.map(item => (
                      <Card key={item.id} className="p-4 bg-card/50 border-border/50">
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-playfair font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, -1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => updateQuantity(item.id, 1)}
                              >
                                +
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-auto"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="X" className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">
                              {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                    <div className="border-t border-border/50 pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-playfair">Итого:</span>
                        <span className="text-2xl font-bold text-primary">
                          {totalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-playfair font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Премиальная коллекция
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Эксклюзивные товары для взыскательной аудитории
          </p>
        </div>

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                  {product.category}
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">{product.title}</h3>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Icon name="ShoppingCart" className="mr-2 h-4 w-4" />
                    В корзину
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 px-4 mt-20">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 LUXORIA. Премиальный бутик для взыскательных клиентов
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Icon name="Shield" className="h-5 w-5 text-primary" />
            <Icon name="Award" className="h-5 w-5 text-primary" />
            <Icon name="Lock" className="h-5 w-5 text-primary" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
