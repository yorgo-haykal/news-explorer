<template>
  <form class="search-box" @submit.prevent="onSubmit">
    <input v-model.trim="q" type="text" placeholder="Search news" required />
    <button type="submit">search</button>
  </form>
</template>

<script>
export default {
  name: "SearchBar",
  data: () => ({ q: "" }),
  methods: {
    onSubmit() {
      this.$router.push({ name: "explore", query: { q: this.q } });
    },
  },
};
</script>

<style>
.search-box {
  display: flex;
  align-items: center;
  width: 750px;
}

.search-box input {
  flex: 1;
  width: 60ch;
  height: auto;
  padding: 12px 20px;
  border-radius: 50px 0 0 50px;
  border: 1px solid gray;
  font-size: large;
}

.search-box button {
  padding: 12px 25px;
  height: auto;
  padding: 12px 20px;
  border: 1px solid gray;
  background: blue;
  color: white;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  border-radius: 0 50px 50px 0;
}
</style>
