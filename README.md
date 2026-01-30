Movie Seat Booking App

Detta projekt är en webbapplikation för bokning av bioplatser, skapad som en del av utbildningen Webbutvecklare .NET (Nackademin), kursen Frontend 2. Syftet med applikationen är att tillämpa moderna frontend-principer i React med komponentbaserad arkitektur, state-hantering och kommunikation med ett REST-API.

Applikationen låter användaren välja film, markera platser i en biosalong och genomföra en bokning. Projektet innehåller även en admin-del där filmer kan administreras. Arbetet uppfyller både G- och VG-krav enligt kursens instruktioner.

Innehåll  
Applikationen består av följande delar:

Bokningssida
– Val av film via dropdown  
– Visning av biosalong med platser  
– Möjlighet att välja och avmarkera lediga platser  
– Upptagna platser kan inte interageras med  
– Dynamisk uppdatering av antal valda platser och totalpris  
– Bokningsknapp som öppnar formulär  

Bokningsformulär
– Inmatning av namn och telefonnummer  
– Validering i JavaScript med feedback till användaren  
– Skickar bokning till API och sparar i JSON-server  


Admin-del
– Lista alla filmer  
– Skapa nya filmer  
– Redigera befintliga filmer  
– Ta bort filmer  
– CRUD-operationer mot API  
– Modaler för create, edit, delete och success 


Tekniker och verktyg  

Frontend
React – Single Page Application (SPA) med Client Side Rendering (CSR)  
JavaScript (ES6+)  
CSS Modules – komponentbaserad styling  
React Router – navigation mellan boknings- och admin-sidor  

Backend (lokalt)
JSON Server – REST-API för filmer och bokningar  

Övrigt
Vite – utvecklingsserver och build-verktyg (JSX-transformering och produktion)
ESLint – kodkvalitet och struktur  
VS Code – utvecklingsmiljö  
GitHub Pages – publicering av produktion  

Arkitektur och struktur  

Applikationen är uppdelad i:
– Pages (MovieSeatBookPage, AdminMoviesPage)  
– Uppdelning i mindre ansvarsspecifika komponenter för att undvika duplicering och förenkla vidareutveckling (Seat, SeatRow, Seats, ...)  
– API-anrop hanteras både direkt i komponenter och via separata hjälpfunktioner  
– CSS Modules - separat styling per komponent

State hanteras huvudsakligen i sidkomponenterna och skickas vidare via props till barnkomponenter. Callback-funktioner används för att hantera användarinteraktioner och uppdatera state uppåt i komponentträdet.

Dataflöde (översikt)

– Filmer hämtas från API vid mount  
– Vald film sparas i state  
– Platser renderas baserat på aktuell film  
– Klick på plats uppdaterar order-state  
– Bokning skickas till API  
– Efter lyckade åtgärder visas en success-modal som bekräftelse för användaren 

API (JSON Server)

Applikationen använder ett lokalt REST-API via JSON Server med resurserna:
– movies  
– bookings  

API:t används för att:
– Hämta filmer  
– Skapa, uppdatera och ta bort av filmer  
– Lagra bokningar  



  



