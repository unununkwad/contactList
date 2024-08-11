# contactList
Recruitment task
1.	Kompilacja aplikacji - poniżej przedstawiono kroki niezbędne do uruchomienia aplikacji:
  •	Skopiować projekt z repozytorium githuba. Poniżej link do repozytorium.
  https://github.com/unununkwad/contactList-FE
  •	W terminalu wprowadzić polecenie npm install, a następnie npm start

2.	Wykorzystane biblioteki
  •	Darmowy template - Vision UI Dashboard
  •	axios
  •	reactstrap
  •	react-select
  •	sweetalert2
  •	@sweetalert2/theme-dark

3.	Opis poszczególnych klas i metod
  •	Login.js
    Login wysyła do backendu nazwę użytkownika oraz hasło. Jeżeli podane dane są prawidłowe, to zapisuje jego token i nazwę użytkownika w localStorage, a następnie przenosi użytkownika do listy kontaktów. Token używany jest do autoryzacji użytkownika, oraz do wyświetlania przycisków przenoszących do widoków dostępnych       dla zalogowanych użytkowników.

  •	Logout.js
    Logout czyści localStorage oraz przenosi do listy kontaktów.

  •	Contacts.js
    Plik Contacts służy jako hub dla widoków związanych z kontaktami. Jeżeli żaden z widoków nie jest otwarty, wtedy wyświetla listę kontaktów.
    Plik zawiera komponent getContact, który pobiera z backendu listę kontaktów, a następnie zapisuje je w formie odpowiedniej dla tabeli. Tworzy również przycisk, po kliknięciu którego wyświetlają się szczegóły wybranego kontaktu. Jeżeli użytkownik jest zalogowany, to wyświetli się również przycisk służący do usunięcia     kontaktu.
    W pliku Contacts znajduje się również komponent deleteContact, który wysyła do backendu protokół wymuszający usunięcie kontaktu o podanym identyfikatorze. Po pozytywnej odpowiedzi odświeża listę kontaktów.
  
  •	ContactDetails.js - Wyświetla w formie listy informacje otrzymane od rodzica.
  
  •	AddContact.js
    Plik zawiera dwa hooki useEffect. Pierwszy z nich uruchamia się po załadowaniu widoku i służy do pobrania z backendu kategorii, podkategorii oraz emaili. Drugi natomiast resetuje zmienne z podkategorią po zmianie kategorii.
    Plik zawiera również komponent służący do walidacji oraz wysłania do zapisu danych kontaktu. Po pozytywnej odpowiedzi zamyka widok.
  
  •	EditContact.js
    Plik działa podobnie do AddContact. Różni się od niego tym, że po załadowaniu widoku ustawia zmienne, aby wyświetliły się w formularzu. Wykorzystany został tutaj timeout, ponieważ po ustawieniu kategorii uruchamia się z chwilowym opóźnieniem useEffect resetujący podkategorię.
 
