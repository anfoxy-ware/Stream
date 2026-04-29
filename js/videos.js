// =====================================================
//  videos.js — Tu biblioteca de contenido
//
//  PELÍCULAS Y OTROS (sin episodios):
//  {
//      categoria: "Peliculas",   ← Peliculas | Otros
//      platform:  "embed",       ← "embed" o "drive"
//      videoId:   "https://...", ← URL embed o ID de Drive
//      titulo:    "Nombre",
//      duracion:  "1h 30min",
//      thumb:     "url o ruta"
//  }
//
//  SERIES (con episodios):
//  {
//      categoria: "Series",
//      titulo:    "Nombre de la serie",
//      thumb:     "url portada",
//      episodios: [
//          {
//              titulo:   "T1 E1 - Piloto",
//              duracion: "45min",
//              platform: "embed",       ← "embed" o "drive"
//              videoId:  "https://...", ← URL embed o ID de Drive
//              thumb:    ""             ← opcional por episodio
//          },
//          ...
//      ]
//  }
// =====================================================

const videos = [

    // ── PELÍCULAS ──────────────────────────────────
    {
        categoria: "Peliculas",
        platform:  "drive",
        videoId:   "1jlOlJbXWzUUAUShl7Kb8xPkLMPSWXleW",
        titulo:    "Chainsaw Man la película: Arco de Reze",
        duracion:  "1h 40min",
        thumb:     "assets/imagenes/Chainsawman_reze.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "drive",
        videoId:   "1gmxU4JfXO0zTDVNB18t72__m8nDxN4F5",
        titulo:    "REC 1",
        duracion:  "1h 15min",
        thumb:     "assets/imagenes/REC1.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/krra6ya8kcz8",
        titulo:    "Five Nights At Freddy's",
        duracion:  "1h 49min",
        thumb:     "assets/imagenes/FNAF1.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/my7711mnl0he",
        titulo:    "Five Nights At Freddy's 2",
        duracion:  "1h 45min",
        thumb:     "assets/imagenes/FNAF2.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/dzvtnt17bugl",
        titulo:    "Geotormenta",
        duracion:  "1h 49min",
        thumb:     "assets/imagenes/Geo.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/jb91rq7gyazh",
        titulo:    "2012",
        duracion:  "2h 37min",
        thumb:     "assets/imagenes/2012.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/f2scgodkror6",
        titulo:    "Háblame",
        duracion:  "1h 35min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BNjMzMmE5ZDAtYjdhMS00NzUyLTllZjUtZmNmNjRkZWM4YTJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/hubbd2yw0tz4",
        titulo:    "Un lugar en silencio",
        duracion:  "1h 35min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BZGE5MGQ1NmMtYjIwMi00ZTZmLWFkMjMtZGIzMGQzZWE4OTNlXkEyXkFqcGc@._V1_.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/0g7um7sosr1c",
        titulo:    "Solicitud de Amistad",
        duracion:  "1h 30min",
        thumb:     "https://pics.filmaffinity.com/Friend_Request-273484278-large.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://vimeos.net/embed-05cj58qowmxd.html",
        titulo:    "Until Dawn",
        duracion:  "1h 43min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BNzg5MTNkOTQtZDU2ZC00MjM3LTk1MDAtMTYyZDFmN2Y2MTY5XkEyXkFqcGc@._V1_.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/3zplzw2z5su2",
        titulo:    "Dejar el mundo atrás",
        duracion:  "2h 21min",
        thumb:     "https://pics.filmaffinity.com/Dejar_el_mundo_atraas-433256303-mmed.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/dq1dl5o3voz8",
        titulo:    "Interestelar",
        duracion:  "2h 49min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://vimeos.net/embed-1ru5fc8d959w.html",
        titulo:    "Eliminar amigo",
        duracion:  "1h 22min",
        thumb:     "https://m.media-amazon.com/images/S/pv-target-images/fdb6bc2c6f0e12a81fd585d5448a57508684f0330eae1a3f3e0fa58267a1494b.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://vimeos.net/embed-qhtwfjm0rs7n.html",
        titulo:    "Eliminar amigo 2",
        duracion:  "1h 32min",
        thumb:     "https://play-lh.googleusercontent.com/z4jAymVGGE3PjTpSnw-Fr2iKNebVp85zTNHlcl1Dpz7JKsazB33PIKOlQVcfFqY4E55rgaEw-cOcE72at38"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/hhdhx9d1og9d",
        titulo:    "Megan",
        duracion:  "1h 41min",
        thumb:     "https://play-lh.googleusercontent.com/LwIED8r_R-RPZGLUQU4cuHU2mT6m9oBEhqrBdARjRAwTP-3jxhvvZHZdVF8KLrIOrJGcITFiA5VQRMPLcA"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/jjqxmr9tg0sy",
        titulo:    "Megan 2.0",
        duracion:  "2h",
        thumb:     "https://i.redd.it/which-one-did-you-like-more-between-megan-and-megan-2-0-v0-qh01251s81pg1.jpg?width=2000&format=pjpg&auto=webp&s=c9e7b5711b39426279a110a0254f08277c49da54"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://vimeos.net/embed-t0asskfapj18.html",
        titulo:    "Avatar: Fuego y ceniza",
        duracion:  "3h 14min",
        thumb:     "https://pics.filmaffinity.com/Avatar_Fuego_y_ceniza-573008793-large.jpg"
    },
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/fhllvw69re3c",
        titulo:    "Amor Adulto",
        duracion:  "1h 45min",
        thumb:     "https://tomatazos.buscafs.com/2022/09/amor-adulto.jpg"
    },
        {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/7ppivg2pnic1",
        titulo:    "The invasion",
        duracion:  "1h 39min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BOTU3ZTg4OTktODUyNi00N2U4LWIwYzYtNDAzZDE0MjgyOTM4XkEyXkFqcGc@._V1_.jpg"
    },
            {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysevepoin.com/e/ot6x8airpg2p",
        titulo:    "Super Mario Galaxy: La película",
        duracion:  "1h 37min - Grabada en cines",
        thumb:     "https://m.media-amazon.com/images/M/MV5BMTZkYzE2OGYtYTdjNC00ZDI2LTg0MjEtMjE0YmUzZGFjM2Y3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
            {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/21nok7v722sg",
        titulo:    "Super Mario Bros: La película",
        duracion:  "1h 32min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BZDkyMDBiN2EtYTM2Ni00ZjRjLWFmZWQtZDdkZDBhNTQzYTU4XkEyXkFqcGc@._V1_.jpg"
    },
    ,
            {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/5pje93c98rbt",
        titulo:    "Smile",
        duracion:  "1h 56min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BNzg4YjExMDAtYWUxOS00MTFmLTlmMzAtYWYyMjIwOGQ3OWEwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },

    ,
            {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/l6ihiku5q4y0",
        titulo:    "Smile 2",
        duracion:  "2h 09min",
        thumb:     "https://play-lh.googleusercontent.com/vnQS53VE9s0BvbV3r4dXwAXWAEUODwoTlJ9RF2rzfzBs6u0p3thjYMsWabZi70wCMPkIffIRcWtNjvQX_w"
    },

                {
        categoria: "Peliculas",
        platform:  "drive",
        videoId:   "1O0zv-TJWabh3bZChwNgqScQ2bAT8JOUr",
        titulo:    "Andrea",
        duracion:  "2h 05min",
        thumb:     "https://resources.diariolibre.com/images/2022/08/22/pelicula-andrea-cine-bca3abc2-focus-0-0-896-504.jpg"
    },
    
                {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/xuo3xbnctsc5",
        titulo:    "Los juegos del hambre",
        duracion:  "2h 22min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BZjI5MjZiYWQtZTgxMi00ODUxLTkwOTctYWFiZmJkOWU0MWQ3XkEyXkFqcGc@._V1_.jpg"
    },
                       
    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/gv6rrh3lt9jt",
        titulo:    "Los juegos del hambre: En llamas",
        duracion:  "2h 26min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BZTBmOGU0MDctMTgyNS00ZDFkLWFlOTItOTI3OWYzNTU3MjBmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },

                    {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/ihk0j2qe26aj",
        titulo:    "Los juegos del hambre: Sinsajo - Parte 1",
        duracion:  "2h 02min",
        thumb:     "https://spoilertown.com/wp-content/uploads/2024/06/hunger-games-mockingjay-part-1-2014.webp"
    },

                        {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/pygz5iq5688z",
        titulo:    "Los juegos del hambre: Sinsajo - Parte 2",
        duracion:  "2h 16min",
        thumb:     "https://i.blogs.es/e286af/cartel-los-juegos-del-hambre-sinsajo-parte-2/1366_2000.jpg"
    },

     {
        categoria: "Peliculas",
        platform:  "embed",
        videoId:   "https://bysedikamoum.com/e/q970m4k8zjge",
        titulo:    "Los juegos del hambre: Balada de los pajaros cantores y serpientes",
        duracion:  "2h 37min",
        thumb:     "https://m.media-amazon.com/images/M/MV5BMjIwMDkwZjUtMGU0ZC00NGQ5LWJhMWUtNWZjZDFjZjU2NTZiXkEyXkFqcGc@._V1_.jpg"
    },

    
    



    
    // ── SERIES ──────────────────────────────────────
    // Serie :Dark
    {
        categoria: "Series",
        titulo:    "Dark",
        thumb:     "https://cdn.culturagenial.com/es/imagenes/dark-logo-cke.jpg?class=article",
        episodios: [
            {
                titulo:   "T1 E1- Secretos",
                duracion: "51min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-aeyyn4wosizi.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E2 - Mentiras",
                duracion: "44min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-f6bi49xfm3hv.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E3 - Pasado y presente",
                duracion: "45min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-3q2d6cvvht3t.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E4 - Vidas dobles",
                duracion: "47min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-6pd8bmuhvtas.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E5 - Verdades",
                duracion: "45min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-xg5rshu2xnoj.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E6 - Sic mundus creatus est",
                duracion: "51min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-r3pwnpsuaptq.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E7 - Encrucijadas",
                duracion: "51min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-d69adkcitqct.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E8 - Lo que se siembre, eso mismo se cosecha",
                duracion: "50min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-sbget29iimla.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E9 - Todo ocurre ahora",
                duracion: "55min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-j2ra6hgh2ue1.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            },
            {
                titulo:   "T1 E10 - Episodio 10",
                duracion: "57min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-vuxwx24kss4c.html",
                thumb:    "https://sitecoreaudioprod.umusicpub.com/sitecore_media/E7A3915F-7FDF-4C46-B27B-FC9DCC0560FF.jpg"
            }
        ]
  
  
  
    },

    // Serie :Red Rose
    {
        categoria: "Series",
        titulo:    "Red Rose",
        thumb:     "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/0Qzqdxw-HG1AiOKLWWPsFOUDA2E/AAAABU6xDpAQjYShWxrOcEoJYeoY_BGLWHA63lnltDoQTKlXOFQQY96m4P_D_IEZtt5mUo_a3h_Ua5RB2lwDgULVRqXNfzONH576FtzMvBNi2yV21aunbCE919WI2htlzXuYIUxcjg.webp?r=15a",
        episodios: [
            {
                titulo:   "T1 E1- El norte es muy deprimente",
                duracion: "49min",
                platform: "embed",
                videoId:  "https://xupalace.org/video/tt19788500-1x01/",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E2 - El Jardín",
                duracion: "40min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-cuiwa7g8iwp4.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E3 - Una cabeza de turco",
                duracion: "48min",
                platform: "embed",
                videoId:  "https://jefferycontrolmodel.com/e/eloyyvglw9gh",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E4 - Manchester",
                duracion: "43min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-pg796lscjjh1.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E5 - Aislamiento",
                duracion: "43min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-8rtf6obn39h3.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E6 - Día de resultados",
                duracion: "44min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-qcs9p1y7dw5y.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E7 - Más vale tarde que nunca",
                duracion: "37min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-dodwgd8lhrli.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            },
            {
                titulo:   "T1 E8 - El jardinero",
                duracion: "41min",
                platform: "embed",
                videoId:  "https://vimeos.net/embed-mlarzwk6k8kv.html",
                thumb:    "https://horrornewsnetwork.net/wp-content/uploads/2020/02/Screenshot_20200227-2349253.png"
            }
        ]
  
  
  
    },




];