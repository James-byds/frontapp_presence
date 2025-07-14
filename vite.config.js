import { defineConfig } from 'vite'
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { readdirSync } from 'fs';


//all pages 
const pages = {
  'index.html': {
    title: 'Accueil',
    description: 'Bienvenue sur notre site.'
  }
}

//boucle tous les fichier html du projet pour les mettre dans /dist
const htmlFiles = readdirSync(__dirname)
  .filter(file => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = file.replace(/\.html$/, '');
    entries[name] = resolve(__dirname, file);
    return entries;
  }, {});

//add partials html
export default {
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        const pageName = pagePath.split('/').pop(); // récupère 'index.html'
        return pages[pageName] || {};
      }
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    rollupOptions: {
      input: htmlFiles //récupère tous les fichiers html
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  }
}


/*export default defineConfig({//used for bulma css
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules']
      }
    }
  }
})*/