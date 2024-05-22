import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import generateRandomNumbers from "./number-generator.mjs";

const n = 10000;

describe("generateRandomNumbers", () => {
	describe("Error handling", () => {
		test("throws an error on invalid type inputs", () => {
			const invalidTypeInputs = [null, "1", true, false];
			invalidTypeInputs.forEach((n) => {
				assert.throws(() => generateRandomNumbers(n));
			});
		});

		test("throws an error on invalid number inputs", () => {
			const invalidNumberInputs = [
				-Infinity,
				Number.MIN_SAFE_INTEGER,
				-5,
				-1,
				NaN,
				Math.pow(2, 32), // Invalid array length
				Number.MAX_SAFE_INTEGER,
				Infinity,
			];
			invalidNumberInputs.forEach((n) => {
				assert.throws(() => generateRandomNumbers(n));
			});
		});
	});

	describe("Boundary Cases", () => {
		test("should return [] when n is 0", () => {
			const result = generateRandomNumbers(0);
			assert.deepEqual(result, [], "does not return empty array");
		});

		test("should return [1] when n is 1", () => {
			const result = generateRandomNumbers(1);
			assert.deepEqual(result, [1], "expected [1]");
		});

		test("should round decimal inputs down", () => {
			const result = generateRandomNumbers(2.9);
			assert.equal(result.length, 2, "expected length 2");
		});
	});

	describe("Default Behaviour", () => {
		test("generates an array of 10,000 numbers by default", () => {
			const result = generateRandomNumbers();
			assert.ok(Array.isArray(result), "expected an array");
			assert.equal(result.length, 10000, "expected 10,000 elements");
		});
	});

	describe("Number Range", () => {
		test("has ${n} numbers in list", () => {
			const result = generateRandomNumbers(n);
			assert.equal(result.length, n, "expected n numbers");
		});

		test("has unique numbers (no repeats)", () => {
			const result = generateRandomNumbers(n);
			const unique = new Set(result);
			assert.equal(
				result.length,
				unique.size,
				"expected only unique numbers"
			);
		});

		test(`has each number from 1...${n} (inclusive)`, () => {
			const result = generateRandomNumbers(n);
			const set = new Set(result);

			let isMissingNumbers = false;
			for (let i = 1; i <= n; i++) {
				if (!set.has(i)) {
					isMissingNumbers = true;
					break;
				}
			}
			assert.equal(
				isMissingNumbers,
				false,
				"expected all numbers from 1 to n (inclusive)"
			);
		});

		test(`has only numbers between 1 and ${n} inclusive`, () => {
			const result = generateRandomNumbers(n);
			const allNumbersInRange = result.every(
				(number) => number >= 1 && number <= n
			);
			assert.ok(
				allNumbersInRange,
				`expected all numbers to be between 1 and ${n} (inclusive)`
			);
		});
	});
});
