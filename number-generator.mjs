/**
 * Generates an array of integers 1 to n (inclusive), in a pseudorandom order.
 *
 * @param {number} [n=10000] - How many numbers to generate. Defaults to 10000.
 * @returns {number[]} An array of numbers in a pseudorandom order.
 *
 */
export default function generateRandomNumbers(n = 10000) {
	if (typeof n !== "number") {
		throw new TypeError();
	}

	// Round non-integers down
	n = Math.floor(n);
	if (!Number.isInteger(n) || n < 0) {
		throw new RangeError();
	}

	// Populate an array with numbers 1...n (inclusive)
	const numbers = Array.from({ length: n }, (_, i) => i + 1);

	// Randomize the order of numbers in-place using the Fisher-Yates shuffle
	for (let i = n - 1; i >= 1; i--) {
		// randomIndex between 0 and i (inclusive)
		const randomIndex = Math.floor(Math.random() * (i + 1));

		// swap number at randomIndex with a non-shuffled number
		[numbers[randomIndex], numbers[i]] = [numbers[i], numbers[randomIndex]];
	}

	return numbers;
}
