Vue.component("v-autocompleter", {
  props: ['inputContent', 'isActive', 'count', 'changeActiveState'],
  data: function () {
    return {
      animals: animals,
      hints: []
    }
  },
  template:
    `
      <div class="input-autocomplete-wrapper" v-bind:class="getClass">
        <hr class="input-autocomplete-separator" />
        <div class="input-autocomplete" v-bind:class="getClass">
          <ul class="input-autocomplete-list">
            <li class="input-autocomplete-item" v-for="n in displayHints" v-on:click="selectHint">{{ n }}</li>
          </ul>
          <div class="search-buttons-wrapper inside">
          <button class="search-button">Szukaj w Google</button>
          <button class="search-button">Szczęśliwy traf</button>
        </div>
        </div>
        
       
      </div>
    `,
  computed: {
    displayHints: function () {
      let filtered = [];
      if (this.inputContent !== '') {
        filtered = this.animals.filter(
          (animal) =>
            animal
              .toLowerCase()
              .startsWith(this.inputContent.toLowerCase()));
      }

      this.hints = filtered.slice(0, this.count);
      this.isSomeHints();
      return this.hints;
    },
    getClass: function () {
      return this.isActive ? 'active' : '';
    }
  },
  methods: {
    selectHint: function (event) {
      const hintValue = event.target.innerHTML
      this.$emit('select-hint', { 'value': hintValue });
    },
    isSomeHints: function () {
      let isActive;

      if (this.hints[0] === this.inputContent || this.inputContent === '' || this.hints.length === 0)
        isActive = false;
      else {
        isActive = true;
      }

      this.changeActiveState(isActive);
    }
  }
})

new Vue({
  el: '#app',
  data() {
    return {
      inputContent: "",
      isInputActive: false,
    }
  },
  computed: {
    activeClass() {
      return this.isInputActive ? 'active' : '';
    }
  },
  methods: {
    changeInputContent: function (params) {
      this.inputContent = params.value;
      this.isInputActive = false;
      this.isSelected = true;
    },
    changeActiveState: function (isActive) {
      this.isInputActive = isActive;
    },

  }
})

