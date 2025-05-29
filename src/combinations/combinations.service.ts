import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import { CombinationsInCreateDto, CombinationsOutCreateDto } from './dto';
import { ISaveInDbArgs } from './utils/interfaces';

@Injectable()
export class CombinationsService {
  constructor(@Inject('DB_CONNECTION') private readonly db: Connection) {}

  // ----------------------------- Generate And Save Combinations ------------------------------ //
  async generateCombinations(
    args: CombinationsInCreateDto,
  ): Promise<CombinationsOutCreateDto> {
    const { length } = args;

    // ----------------------- Generate Nested Array of items
    const items = await this.generateItemsArray(args.items);

    // ----------------------- Generate Valid Combinations
    const combinations: string[][] = [];

    function combine(index: number, combination: string[]) {
      if (combination.length === length) {
        combinations.push(combination);
        return;
      }

      for (let i = index; i < items.length; i++) {
        for (let j = 0; j < items[i].length; j++) {
          combine(i + 1, [...combination, items[i][j]]);
        }
      }
    }

    combine(0, []);

    const flatItems = items.flat();

    return await this.saveInDb({
      combinations,
      items: flatItems,
    });
  }

  // ------------------------------- Generate Nested Array of Items -------------------------------- //
  async generateItemsArray(types: number[]): Promise<string[][]> {
    const items: string[][] = [];

    for (let i = 0; i < types.length; i++) {
      const letter = String.fromCharCode(65 + i);
      const count = types[i];
      const group: string[] = [];

      for (let j = 1; j <= count; j++) {
        group.push(`${letter}${j}`);
      }

      items.push(group);
    }

    return items;
  }

  // ----------------------------------- Save In Db ------------------------------------- //
  async saveInDb(args: ISaveInDbArgs) {
    const { combinations, items } = args;

    await this.db.beginTransaction();

    try {
      await this.db.query('INSERT IGNORE INTO items (name) VALUES ?', [
        items.map((item) => [item]),
      ]);

      await this.db.query(
        'INSERT IGNORE INTO combinations (combination, alias) VALUES ?',
        [combinations.map((combo) => [JSON.stringify(combo), combo.join(',')])],
      );

      const [response]: any = await this.db.query(
        'INSERT INTO results (combination) VALUES (?)',
        [JSON.stringify(combinations)],
      );

      await this.db.commit();

      const responseId = response.insertId;

      return {
        id: responseId,
        combinations,
      };
    } catch (error) {
      await this.db.rollback();
      console.log('Filed to save items and combinations');
      console.error('Doing rollback for error:', error.message);
      throw error;
    }
  }
}
