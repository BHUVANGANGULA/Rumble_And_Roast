import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  image: string;
  category: 'Signature Coffee' | 'Premium Biryanis' | 'Mains' | 'Desserts' | 'Pizza' | 'Burgers' | 'Pasta' | 'Veg Sandwiches' | 'Non-Veg Sandwiches';
  isSignature?: boolean;
}

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const menuItems: MenuItem[] = [
    {
      id: 'item-1',
      name: 'Signature Vanilla Latte',
      desc: 'Champ-selected double espresso, organic steamed milk, house-infused vanilla bean extract, topped with elegant leaf art.',
      price: '₹540',
      image: '/assets/images/coffee_latte_art.png',
      category: 'Signature Coffee',
      isSignature: true
    },
    {
      id: 'item-2',
      name: 'Royal Potlam Chicken Biryani',
      desc: 'Fragrant aged Basmati rice, marinated chicken, roasted spices, and saffron, wrapped tightly in a direct-flamed banana leaf to lock in earthy aromas.',
      price: '₹1,535',
      image: '/assets/images/potlam_biryani.png',
      category: 'Premium Biryanis',
      isSignature: true
    },
    {
      id: 'item-3',
      name: 'Gold-Leaf Chocolate Truffle',
      desc: 'Decadent dark chocolate mousse layered with fudge cake, dusted with Valrhona cocoa, and finished with flakes of edible 24k gold.',
      price: '₹910',
      image: '/assets/images/chocolate_truffle.png',
      category: 'Desserts',
      isSignature: true
    },
    {
      id: 'item-4',
      name: 'Artisanal Hazelnut Cappuccino',
      desc: 'Rich espresso shot, velvety dense foam, drizzled with roasted Piedmont hazelnut reduction.',
      price: '₹475',
      image: '/assets/images/coffee_latte_art.png',
      category: 'Signature Coffee'
    },
    {
      id: 'item-5',
      name: 'Signature Potlam Mutton Biryani',
      desc: 'Slow-cooked spiced lamb shoulder, basmati, star anise, cardamoms, sealed inside a signature fire-flamed banana leaf envelope.',
      price: '₹1,830',
      image: '/assets/images/potlam_biryani.png',
      category: 'Premium Biryanis',
      isSignature: true
    },
    {
      id: 'item-6',
      name: 'Premium Pistachio Tart',
      desc: 'Rich Sicilian pistachio praline cream inside a butter-crust tart shell, decorated with wild berries.',
      price: '₹790',
      image: '/assets/images/chocolate_truffle.png',
      category: 'Desserts'
    },
    {
      id: 'item-7',
      name: 'Truffle Mushroom Risotto',
      desc: 'Aged Carnaroli rice, wild forest porcini, white truffle emulsion, topped with shaved 24-month Parmigiano-Reggiano.',
      price: '₹1,992',
      image: '/assets/images/cafe_interior.png',
      category: 'Mains'
    },
    {
      id: 'item-8',
      name: 'Pan-Seared Salmon Fillet',
      desc: 'Pacific wild salmon, citrus dill butter, served over a bed of baby asparagus and roasted fingerling potatoes.',
      price: '₹2,407',
      image: '/assets/images/cafe_interior.png',
      category: 'Mains'
    },
    {
      id: 'item-9',
      name: 'Margherita Pizza',
      desc: 'Mozzarella cheese, fresh basil leaves and cherry tomatoes.',
      price: '₹159',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pizza'
    },
    {
      id: 'item-10',
      name: 'Baby Corn & Mushroom Pizza',
      desc: 'Mozzarella, baby corn and mushrooms.',
      price: '₹179',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pizza'
    },
    {
      id: 'item-11',
      name: 'Farm Fresh Pizza',
      desc: 'Mozzarella, basil leaves, and seasonal farm-fresh vegetables.',
      price: '₹199',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pizza'
    },
    {
      id: 'item-12',
      name: 'Peri Peri Chicken Pizza',
      desc: 'Mozzarella cheese and spicy peri peri chicken.',
      price: '₹199',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pizza'
    },
    {
      id: 'item-13',
      name: 'BBQ Chicken Tikka Pizza',
      desc: 'Mozzarella cheese and chicken tikka.',
      price: '₹249',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pizza'
    },
    {
      id: 'item-14',
      name: 'Veg Burger',
      desc: 'Crispy potato cutlet patty topped with melted cheese, lettuce and mayo. Served with fries.',
      price: '₹149',
      image: '/assets/images/food_placeholder.svg',
      category: 'Burgers'
    },
    {
      id: 'item-15',
      name: 'Mushroom Burger',
      desc: 'Creamy mushroom with caramelized onions and melted cheese. Served with fries.',
      price: '₹169',
      image: '/assets/images/food_placeholder.svg',
      category: 'Burgers'
    },
    {
      id: 'item-16',
      name: 'Fish Fillet Burger',
      desc: 'Crispy fish fillet with lettuce, tomato and tartar sauce. Served with fries.',
      price: '₹249',
      image: '/assets/images/food_placeholder.svg',
      category: 'Burgers'
    },
    {
      id: 'item-17',
      name: 'Veg Sandwich - Grilled',
      desc: 'Grilled vegetarian sandwich with fresh vegetables.',
      price: '₹129',
      image: '/assets/images/food_placeholder.svg',
      category: 'Veg Sandwiches'
    },
    {
      id: 'item-18',
      name: 'Veg Cheese Sandwich - Grilled',
      desc: 'Grilled vegetable sandwich with melted cheese.',
      price: '₹219',
      image: '/assets/images/food_placeholder.svg',
      category: 'Veg Sandwiches'
    },
    {
      id: 'item-19',
      name: 'Egg Grilled Sandwich',
      desc: 'Grilled egg sandwich.',
      price: '₹149',
      image: '/assets/images/food_placeholder.svg',
      category: 'Non-Veg Sandwiches'
    },
    {
      id: 'item-20',
      name: 'Egg & Cheese Grilled Sandwich',
      desc: 'Grilled egg and cheese sandwich.',
      price: '₹169',
      image: '/assets/images/food_placeholder.svg',
      category: 'Non-Veg Sandwiches'
    },
    {
      id: 'item-21',
      name: 'Chicken Grilled Sandwich',
      desc: 'Grilled chicken sandwich.',
      price: '₹199',
      image: '/assets/images/food_placeholder.svg',
      category: 'Non-Veg Sandwiches'
    },
    {
      id: 'item-22',
      name: 'Chicken Cheese Grilled Sandwich',
      desc: 'Grilled chicken and cheese sandwich.',
      price: '₹219',
      image: '/assets/images/food_placeholder.svg',
      category: 'Non-Veg Sandwiches'
    },
    {
      id: 'item-23',
      name: 'Alfredo Pasta (Veg)',
      desc: 'Creamy Alfredo pasta with fresh vegetables.',
      price: '₹149',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pasta'
    },
    {
      id: 'item-24',
      name: 'Alfredo Pasta (Non Veg)',
      desc: 'Creamy Alfredo pasta with grilled chicken.',
      price: '₹249',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pasta'
    },
    {
      id: 'item-25',
      name: 'Arrabbiata Pasta',
      desc: 'Spicy Arrabbiata pasta in rich tomato sauce.',
      price: '₹229',
      image: '/assets/images/food_placeholder.svg',
      category: 'Pasta'
    }
  ];

  const categories = ['All', 'Signature Coffee', 'Premium Biryanis', 'Mains', 'Desserts', 'Pizza', 'Burgers', 'Pasta', 'Veg Sandwiches', 'Non-Veg Sandwiches'];

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-matte-black text-cream relative overflow-hidden border-b border-gold/5">
      {/* Background elements */}
      <div className="absolute top-10 right-0 w-[450px] h-[450px] bg-coffee-dark/20 rounded-full blur-3xl -z-10"></div>
      
      {/* Empty spacer for menu showcase Biryani canvas model */}
      <div className="hidden lg:block absolute right-0 top-[20%] w-[35%] h-[60%] z-0 pointer-events-none">
        {/* The 3D Biryani Canvas renders exactly behind this spacer */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-gold text-sm tracking-widest font-mono uppercase">Gourmet Selection</span>
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold text-cream mt-2 tracking-wide">
            Our Signature Menu
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 md:max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold border transition-all duration-300 cursor-pointer ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-coffee-light to-gold text-matte-black border-gold shadow-lg shadow-gold/10'
                  : 'bg-matte-gray/30 border-gold/10 text-cream hover:border-gold/40 hover:text-gold'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid - responsive column shift to give room to 3D canvas on the right */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-8 items-start">
          
          {/* Main items grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-matte-gray/40 rounded-3xl overflow-hidden border border-gold/5 hover:border-gold/20 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-[420px] group"
                >
                  {/* Item Image */}
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.isSignature && (
                      <span className="absolute top-3 right-3 bg-gold text-matte-black font-mono text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-wider shadow">
                        Signature
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-playfair text-lg font-bold text-cream group-hover:text-gold transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-gold font-mono font-bold">{item.price}</span>
                      </div>
                      <p className="text-cream-dark text-xs font-inter leading-relaxed mt-2 line-clamp-3">
                        {item.desc}
                      </p>
                    </div>

                    <button
                      className="w-full bg-matte-light hover:bg-gold hover:text-matte-black border border-gold/10 text-cream text-xs font-semibold py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 group-hover:border-gold/30 cursor-pointer"
                      onClick={() => alert(`${item.name} added to cart!`)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add To Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right layout spacer for the rotating Potlam Biryani model on desktop */}
          <div className="hidden lg:block lg:col-span-3 h-[500px] relative pointer-events-none w-full">
            {/* Visual guide overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-transparent to-transparent"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
