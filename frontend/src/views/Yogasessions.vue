<script>
import { mapActions, mapState } from 'vuex';
import YogasessionCard from '@/components/YogasessionCard.vue'

export default {
  name: 'yogasessions',
  created() {
    this.fetchYogasessions();
  },
  components: {
    YogasessionCard
  },
  computed: {
    ...mapState({
      yogasessions: state => state.yogasessions.data,
      likes: state => state.yogasessions.likes
    }),
  },
  methods: {
    ...mapActions(['fetchYogasessions', 'addLikes'])
  },
};
</script>

<template lang="pug">
div
  h1 Hello!
  button(@click="addLikes") Like!
  div Likes: {{likes}}
  div(v-if="yogasessions.length")
    p Here are the yogasessions:
    div.yogasessions-list
      div.yogasession(v-for="yogasession in yogasessions")
        yogasession-card(:data="yogasession" key="yogasession._id")
</template>

<style>
.yogasessions-list {
  display: flex;
}

.yogasession {
  margin: 30px;
}
</style>
