import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeScholarProfile(url) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
  };

  const response = await axios.get(url, {
    headers,
    timeout: 10000,
  });

  const $ = cheerio.load(response.data);

  const name = $('#gsc_prf_in').text().trim();
  const affiliation = $('.gsc_prf_il').first().text().trim();
  const email = $('.gsc_prf_il').eq(1).text().trim();

  const interests = [];
  $('.gsc_prf_int .gsc_prf_inta').each((i, element) => {
    interests.push($(element).text().trim());
  });

  const citationStats = {};
  $('.gsc_rsb_std').each((i, element) => {
    const value = $(element).text().trim();
    if (i === 0) citationStats.totalCitations = parseInt(value) || 0;
    if (i === 1) citationStats.hIndex = parseInt(value) || 0;
    if (i === 2) citationStats.i10Index = parseInt(value) || 0;
  });

  const publications = [];
  $('.gsc_a_tr').slice(0, 10).each((i, element) => {
    const titleElement = $(element).find('.gsc_a_at');
    const authorsElement = $(element).find('.gsc_a_at').next();
    const venueElement = $(element).find('.gsc_a_at').next().next();
    const citationsElement = $(element).find('.gsc_a_c');
    const yearElement = $(element).find('.gsc_a_y');

    const title = titleElement.text().trim();
    const authors = authorsElement.text().trim();
    const venue = venueElement.text().trim();
    const citations = parseInt(citationsElement.text().trim()) || 0;
    const year = parseInt(yearElement.text().trim()) || null;

    if (title) {
      publications.push({
        title,
        authors,
        venue,
        citations,
        year,
      });
    }
  });

  const coAuthors = [];
  $('.gsc_rsb_a_desc a').each((i, element) => {
    const name = $(element).text().trim();
    const affiliation = $(element).next('.gsc_rsb_a_ext').text().trim();
    if (name) {
      coAuthors.push({ name, affiliation });
    }
  });

  return {
    profile: {
      name,
      affiliation,
      email: email || null,
      interests,
      profileUrl: url,
    },
    metrics: {
      totalCitations: citationStats.totalCitations || 0,
      hIndex: citationStats.hIndex || 0,
      i10Index: citationStats.i10Index || 0,
    },
    publications: publications.slice(0, 20),
    coAuthors: coAuthors.slice(0, 10),
    lastUpdated: new Date().toISOString(),
  };
}