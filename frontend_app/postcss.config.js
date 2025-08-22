/**
 * PostCSS configuration for CRA + Tailwind v4
 * Use plugin array form to avoid CRA misinterpreting plugin names as direct usage.
 */
module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};
