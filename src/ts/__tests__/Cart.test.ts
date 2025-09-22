import Cart from '../service/Cart';
import Buyable from '../domain/Buyable';

test('new card should be empty', () => {
  const cart = new Cart();

  expect(cart.items.length).toBe(0);
});

test('add() should add item to cart', () => {
  const cart = new Cart();
  const item: Buyable = { id: 1, name: 'Test', price: 100 };

  cart.add(item);

  expect(cart.items).toEqual([item]);
});

test('getTotalPrice() should return sum without discount', () => {
  const cart = new Cart();
  const item1: Buyable = { id: 1, name: 'A', price: 100 };
  const item2: Buyable = { id: 2, name: 'B', price: 200 };

  cart.add(item1);
  cart.add(item2);

  expect(cart.getTotalPrice()).toBe(300);
});

test('getTotalPriceWithDiscount() should apply discount correctly', () => {
  const cart = new Cart();
  const item1: Buyable = { id: 1, name: 'A', price: 100 };
  const item2: Buyable = { id: 2, name: 'B', price: 200 };

  cart.add(item1);
  cart.add(item2);

  expect(cart.getTotalPriceWithDiscount(10)).toBe(270); // 300 - 10%
  expect(cart.getTotalPriceWithDiscount(0)).toBe(300);  // без скидки
  expect(cart.getTotalPriceWithDiscount(100)).toBe(0);  // полная скидка
});


test('getTotalPriceWithDiscount() should throw error for invalid discount', () => {
  const cart = new Cart();
  const item: Buyable = { id: 1, name: 'A', price: 100 };

  cart.add(item);

  expect(() => cart.getTotalPriceWithDiscount(-5)).toThrow();
  expect(() => cart.getTotalPriceWithDiscount(150)).toThrow();
});


test('removeItem() should remove item by id', () => {
  const cart = new Cart();
  const item1: Buyable = { id: 1, name: 'A', price: 100 };
  const item2: Buyable = { id: 2, name: 'B', price: 200 };

  cart.add(item1);
  cart.add(item2);

  cart.removeItem(1);

  expect(cart.items).toEqual([item2]);
});


test('removeItem() with non-existing id should not change cart', () => {
  const cart = new Cart();
  const item: Buyable = { id: 1, name: 'A', price: 100 };

  cart.add(item);

  cart.removeItem(999);

  expect(cart.items).toEqual([item]);
});
