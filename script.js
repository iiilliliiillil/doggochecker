'use strict';

// Hacky hacks start here (tnx parcel)
const placeholderUrl = document.getElementById('img-placeholder').src;
const agentpinUrl = document.getElementById('img-agentpin').src;
const petpinUrl = document.getElementById('img-petpin').src;
const shelpinUrl = document.getElementById('img-shelpin').src;

const myIcon = L.icon({
  iconUrl: placeholderUrl,
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [-3, -60],
});

const petIcon = L.icon({
  iconUrl: petpinUrl,
  iconSize: [60, 60],
  iconAnchor: [30, 59],
  popupAnchor: [-3, -60],
});

const shelIcon = L.icon({
  iconUrl: shelpinUrl,
  iconSize: [60, 60],
  iconAnchor: [30, 59],
  popupAnchor: [-3, -60],
});

const shelters = {
  tamaz: [41.68058616424739, 44.890587433797606],
  saburtalo: [41.759052910070956, 44.7241872267311],
  vake: [41.77725673725068, 44.734871839005876],
  varketili: [41.68200580031455, 44.87386397170825],
};

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--typeuc');
const inputSos = document.querySelector('.form__input--typesos');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--temp');
const inputElevation = document.querySelector('.form__input--climb');

const agentstvo = document.querySelector('.form__sublabel__agent');
const checkbox = document.querySelector('.form__check');

class App {
  #map;
  #mapEvent;

  constructor() {
    this._get_Position();

    form.addEventListener('submit', this._newWorkout.bind(this));

    inputType.addEventListener('change', function () {
      agentstvo.classList.toggle('hidden');
    });

    inputSos.addEventListener('change', function () {
      checkbox.classList.toggle('hidden');
    });

    checkbox.addEventListener('change', this._showShelters.bind(this));
  }

  _get_Position() {
    navigator.geolocation.getCurrentPosition(this._loadMap.bind(this));
  }

  _loadMap(position) {
    const coords = [position.coords.latitude, position.coords.longitude];

    this.#map = L.map('map').setView(coords, 13);

    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(this.#map);

    L.marker(coords, { icon: myIcon })
      .addTo(this.#map)
      .bindPopup('Вы находитесь тут')
      .openPopup();

    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(e) {
    this.#mapEvent = e;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _showHelpNumber() {}

  _showShelters() {
    L.marker(shelters.tamaz, { icon: shelIcon })
      .addTo(this.#map)
      .bindPopup('Район Тамаз. Работает круглосуточно. Тел: 595 63 36 36')
      .openPopup();

    L.marker(shelters.vake, { icon: shelIcon })
      .addTo(this.#map)
      .bindPopup('Район Ваке. Работает до 19:00. Тел: 595 63 36 36')
      .openPopup();

    L.marker(shelters.varketili, { icon: shelIcon })
      .addTo(this.#map)
      .bindPopup('Район Варкетили. Работает круглосуточно. Тел: 595 63 36 36')
      .openPopup();

    L.marker(shelters.saburtalo, { icon: shelIcon })
      .addTo(this.#map)
      .bindPopup('Район Сабуртало. Работает круглосуточно. Тел: 595 63 36 36')
      .openPopup();
  }

  _newWorkout(ev) {
    ev.preventDefault();

    const pos = [this.#mapEvent.latlng.lat, this.#mapEvent.latlng.lng];

    L.marker(pos, { icon: petIcon })
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          content: 'Ваша точка',
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .openPopup();
  }
}

const app = new App();
