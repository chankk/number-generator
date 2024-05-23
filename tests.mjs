import { strict as assert } from "node:assert";
import { describe, test } from "node:test";
import generateRandomNumbers from "./number-generator.mjs";

const n = 10000;

describe("generateRandomNumbers", () => {
	describe("Error handling", () => {
		test("throws an error on invalid input type", () => {
			const invalidTypeInputs = [null, "1", true, false];
			invalidTypeInputs.forEach((n) => {
				assert.throws(() => generateRandomNumbers(n));
			});
		});

		test("throws an error on invalid input value", () => {
			const invalidNumberInputs = [
				-Infinity,
				Number.MIN_SAFE_INTEGER,
				-5,
				-1,
				-0.1,
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
		test("returns [] when n is 0", () => {
			const result = generateRandomNumbers(0);
			assert.deepEqual(result, [], "expected an empty array");
		});

		test("returns [1] when n is 1", () => {
			const result = generateRandomNumbers(1);
			assert.deepEqual(result, [1], "expected [1]");
		});
	});

	describe("Edge Cases", () => {
		test("returns [] when n is a float between 0 and 1", () => {
			const result = generateRandomNumbers(0.9);
			assert.deepEqual(result, [], "expected an empty array");
		});

		test("returns integers when n is a float greater than 1", () => {
			const result = generateRandomNumbers(5.9);
			const allIntegers = result.every((val) => {
				return Number.isInteger(val);
			});
			assert.ok(allIntegers, "expected only integers");
		});
	});

	describe("Default Behaviour", () => {
		test("returns an array of 10,000 numbers by default", () => {
			const result = generateRandomNumbers();
			assert.ok(Array.isArray(result), "expected an array");
			assert.equal(result.length, 10000, "expected 10,000 elements");
		});
	});

	describe("Number Range", () => {
		test("returns n numbers in the list", () => {
			const result = generateRandomNumbers(n);
			assert.equal(result.length, n, "expected n numbers");
		});

		test("returns only unique numbers (no repeats)", () => {
			const result = generateRandomNumbers(n);
			const unique = new Set(result);
			assert.equal(
				result.length,
				unique.size,
				"expected only unique numbers"
			);
		});

		test("returns each number from 1...n (inclusive)", () => {
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

		test("returns only numbers between 1 and n inclusive", () => {
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
