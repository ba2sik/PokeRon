import { ZodError } from 'zod';

export function printZodError(error: ZodError) {
  console.log('Validation Errors:');
  error.errors.forEach((err, index) => {
    console.log(`Error ${index + 1}:`);
    console.log(`  Field: ${err.path.join(' -> ')}`);
    console.log(`  Description: ${err.message}`);
    console.log(`  Error Code: ${err.code}`);
    console.log('---------------------');
  });
}
