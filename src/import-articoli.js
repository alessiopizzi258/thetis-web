import { supabase } from './src/lib/supabaseClient';
import * as cheerio from 'cheerio';

async function importaDaWordPress(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Estrazione dati specifica per la struttura WordPress di Thetis
    const titolo = $('.entry-title').text().trim();
    const contenuto = $('.entry-content').text().trim();
    // Prende la prima immagine dell'articolo o l'immagine in evidenza
    const image_url = $('.entry-content img').first().attr('src') || $('.wp-post-image').attr('src');
    
    // Genera un abstract prendendo le prime 200 parole
    const abstract = contenuto.split(' ').slice(0, 40).join(' ') + '...';

    const { data, error } = await supabase
      .from('articoli')
      .insert([
        { 
          titolo, 
          contenuto, 
          abstract, 
          image_url,
          created_at: new Date().toISOString() // O puoi estrarla dai meta tag di WP
        }
      ]);

    if (error) throw error;
    console.log(`✅ Articolo "${titolo}" importato con successo!`);
    
  } catch (err) {
    console.error("❌ Errore durante l'importazione:", err.message);
  }
}

// Esegui l'importazione per i tuoi due link
const links = [
  "https://rivistathetis.wordpress.com/2025/12/10/il-telaio-di-penelope-il-telaio-memoria-di-unarte-antica-che-ancora-vive/",
  "https://rivistathetis.wordpress.com/2025/12/02/i-glossoma-la-nostra-lingua-bova-museo-della-lingua-greco-calabra-gerhard-rohlfs/"
];

links.forEach(link => importaDaWordPress(link));