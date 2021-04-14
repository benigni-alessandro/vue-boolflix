var app = new Vue({
  el: '#root',
  data: {
    risposta:[],
    searchtext: '',
    consigliati:[],
    text: '',
  },
  mounted(){
      axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=55ed5a7c338e0f33b35608c6f63cee1b")
        .then((response) => {
          this.film_tendenza = response.data.results;
          this.film_tendenza.forEach((movie, i) => {
            this.consigliati.push(movie);
          });
      })
  },
  methods:{
    search: function () {
      this.risposta =[];
      this.text = this.searchtext
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=55ed5a7c338e0f33b35608c6f63cee1b&query=${this.searchtext}&language=it-IT`)
        .then((response) => {
          this.movie = response.data.results;
          this.movie.forEach((film, i) => {
            this.risposta.push(film);
          });

        axios.get(`https://api.themoviedb.org/3/search/tv?api_key=55ed5a7c338e0f33b35608c6f63cee1b&query=${this.searchtext}&language=it-IT`)
          .then((response) => {
            this.serie = response.data.results;
            this.serie.forEach((serie, i) => {
              this.risposta.push(serie);
            });
        })
          this.searchtext = '';
      })
      console.log(this.risposta);

    },
    get_titolo:function (pelicula) {
      if (pelicula.title) {
        return pelicula.title;
      } else {
        return pelicula.name;
      }
    },
    get_original_title:function (pelicula) {
      if (pelicula.original_title) {
        return pelicula.original_title;
      } else {
        return pelicula.original_name;
      }
    },
    getvote: function (pelicula) {
      let voto_decimale = parseInt(pelicula.vote_average);
      let voto = parseInt(voto_decimale * 5 / 10);
      console.log(voto);
      return voto;
    },
    get_title:function (img) {
      if (img.title) {
        return img.title;
      } else {
        return img.name;
      }
    },


   }
});
