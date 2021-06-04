module.exports = {
  plugins:[
    require('@tailwindcss/forms'),
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        complementary: 'var(--color-complementary)',
        neutral: 'var(--color-neutral)',
        'neutral-light': 'var(--color-neutral-light)',
        'primary-shadow': 'var(--color-primary-shadow)',
        'complementary-shadow': 'var(--color-complementary-shadow)',
      }
    }
  }
}