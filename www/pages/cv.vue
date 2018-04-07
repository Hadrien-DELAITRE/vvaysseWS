<template>
  <main>
    <Menu />
    <Category
      v-for="(category, index) in categories"
      :key="index"
      :category="category"
    />
  </main>
</template>

<script>
import { stripIndents } from "common-tags"

import Category from "~/components/Cv/Category.vue"
import Menu from "~/components/Menu/Menu.vue"

export default {
  components: {
    Category,
    Menu
  },

  /**
   * @prop {Array<Object>} categories Array of objects containing categories of
   * CV (e.g. experiences, schools, etc.).
   */
  data() {
    return {
      categories: [
        {
          name: "Formations",
          stories: [
            {
              dates: ["2015", "2017"],
              description: stripIndents`
                Le <span class="highlight">Fresnoy</span> - Studio national des
                arts contemporains, Toucoing
              `
            },
            {
              dates: ["2015"],
              description: stripIndents`
                <span class="highlight">DNSAP</span>,
                école nationale supérieure des <span
                class="highlight">Beaux-Arts</span> de Paris, atelier
                Tosan
              `
            },
            {
              dates: ["2011", "2015"],
              description: stripIndents`
                École nationale supérieure des <span
                class="highlight">Beaux-Arts</span> de Paris
              `
            }
          ]
        },
        {
          name: "Expositions",
          stories: [
            {
              dates: ["2018"],
              description: stripIndents`
                <p><span class="italic">#678</span> - exposition
                collective, Villa Belleville, Paris</p>

                <p><span class="italic">Amour metal amour metal amour metal
                amour metal</span>, exposition collective, le FDP, Paris</p>

                <p><span class="italic">Liquidation totale avant
                travaux</span>, exposition collective, appartement privé,
                Paris</p>
              `
            },
            {
              dates: ["2017"],
              description: stripIndents`
                <p><span class="italic">quelques arpentages (Grand Est)</span>,
                exposition collective, Maison de la Region, Strabourg</p>

                <p><span class="italic">Rêvez !2</span>, exposition collective,
                Collection Lambert, Avignon</p>

                <p><span class="italic">Au-delà du bien et du bad</span>,
                exposition collective, La Capela, Paris</p>

                <p><span class="italic">Panorama 19</span>, exposition
                collective, Le Fresnoy, Tourcoing</p>

                <p><span class="italic">Ristreto</span>, exposition collective,
                le Marqui, L’île Saint-Denis</p>

                <p><span class="italic">OFFPAC2017</span>, exposition
                collective, Madrague de Montredon, Marseille</p>

                <p><span class="italic">No way/Highway part 2</span>, exposition
                collective, Ourq blanc, Paris</p>

                <p><span class="italic">No way/Highway</span>, exposition
                personelle, Galerie Escougnou-Cetraro, Paris</p>

                <p><span class="italic">Ein/Off Merci pour la lumiere</span>,
                exposition collective, Chiffonnier, Dijon</p>

                <p><span class="italic">Agora</span>, exposition collective,
                Galerie R-2, Paris</p>
              `
            },
            {
              dates: ["2016"],
              description: stripIndents`
                <p><span class="italic">Panorama 18</span>, exposition
                collective, Le Fresnoy, Tourcoing</p>

                <p><span class="italic">Prix Keskar</span>, exposition
                collective, Cap St-Ouen, St-Ouen</p>

                <p><span class="italic">287 chemin de la mandrague-ville</span>,
                exposition collective, Marseille</p>

                <p><span class="italic">Matter/No Matter</span>, duo show,
                Galerie du Crous, Paris</p>
              `
            },
            {
              dates: ["2015"],
              description: stripIndents`
                <p><span class="italic">Transmissions</span>, exposition
                collective, Palais des Beaux-Arts, Paris </p>
              `
            }
          ]
        },
        {
          name: "Publications",
          stories: [
            {
              dates: ["2017"],
              description: stripIndents`
                <p><span class="italic">Point Contemporain n°7</span>, revue
                trimestrielle</p>

                <p><span class="italic">Roman, Panorama 19</span>, catalogue
                d’exposition</p>

                <p><span class="italic">Rêvez !2</span>, catalogue
                d’exposition</p>

                <p><span class="italic">TAFMAG</span>, revue semestrielle</p>
              `
            },
            {
              dates: ["2016"],
              description: stripIndents`
                <p><span class="italic">‘Voies et voix multiples de l’art
                contemporain’</span>, L’humanité, 25/10/2016</p>

                <p><span class="italic">Panorama 18</span>, catalogue
                d’exposition</p>
              `
            },
            {
              dates: ["2015"],
              description: stripIndents`
                  <p><span class="italic">Transmissions</span>, catalogue
                  d’exposition</p>
                `
            }
          ]
        }
      ]
    }
  }
}
</script>
