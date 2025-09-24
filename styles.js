export const sharedStyles = new CSSStyleSheet();
sharedStyles.replaceSync(`
  :host {
    
 /* GLOBAL STYLES */

    box-sizing: border-box;
    margin: 0;
    padding: 0;

/* COLORS */

    --primary-color: #2b2b2b;
    --secondary-color: #424242;
    --icon-color: #9e9e9e;
   

/* FONTS-FONT SIZE */

--primary-font: Roboto, sans-serif;
  --font-size-base: 16px;
  --font-size-sm: 14px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-xxl: 32px;
  --line-height-base: 1.6;


/* Headings rules */


h1 { font-size: var(--font-size-xxl); font-weight: 700; }

h2 { font-size: var(--font-size-xl); font-weight: 600; }

h3 { font-size: var(--font-size-lg); font-weight: 600; }

p, li, span { font-size: var(--font-size-base); line-height: var(--line-height-base); }

small { font-size: var(--font-size-sm); }



/* BUTTONS */

button {

  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: var(--font-size-base);
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

button .button-primary {
  background-color: #2b2b2b; 
  color: white;
}

button .button-secondary {

background-color: rgba(43,43,43,0.4); /* light-black-opacity 40%*/

color: #2b2b2b; 
}


/* RESPONSIVE RULES */

/* Tablets */
@media (max-width: 1024px) {
  h1 { font-size: 28px; }
  h2 { font-size: 22px; }
  .button { padding: 0.65rem 1.2rem; font-size: 15px; }
}

/* Mobile */
@media (max-width: 640px) {
  h1 { font-size: 24px; }
  h2 { font-size: 20px; }
  p { font-size: 14px; }
  .button { padding: 0.5rem 1rem; font-size: 14px; width: 100%; }
}

}
`);
