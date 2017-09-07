import { Heroes } from './heroes.model';

describe('Heroes Model', () => {
  let hero;
  let name;
  let id;
  beforeEach(() => {
    hero = new Heroes();
  })

  it('hero should be instance of Heroes', () => {
    expect(hero instanceof Heroes).toBe(true);
  });

  it('name and id should be defined', () => {
    hero.name = 'name';
    hero.id = 1;
    expect(hero.name).toBe('name');
    expect(hero.id).toBe(1);
  });

});