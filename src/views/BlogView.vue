<script setup>
//imports
import { ref, reactive, watch, computed, onBeforeUnmount } from "vue";
import useBlogCard from "../stores/blogCard_SM";
import BlogCard from "../components/BlogCard.vue";
import { storeToRefs } from "pinia";

//states, props, general

//pinia state management we must use toreToRefs to destruct the blogCardStore state
const blogCardStore = useBlogCard();
const { blogCardState } = storeToRefs(blogCardStore);

/* watch(editPost, (newv, oldv) => {
  console.log("hi");
}); */

//lifecycle
onBeforeUnmount(() => {
  blogCardStore.togglePost(false);
});

//functions
const editPost = computed({
  //persome computation
  get() {
    return blogCardStore.editPost;
  },
  set(payload) {
    blogCardStore.togglePost(payload);
  },
});
</script>

<template>
  <div class="container">
    <div class="toggle-edit__container">
      <h3>Edit Post</h3>
      <input type="checkbox" v-model="editPost" />
    </div>

    <div class="individual-blog-card__marquee">
      <BlogCard
        v-for="(content, index) in blogCardState"
        :key="index + 'individual'"
        :content="content"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  @include col;
}

.toggle-edit__container {
  @include row-end;
  margin-right: 3rem;
  gap: 1rem;
  margin-top: 3rem;

  input[type="checkbox"] {
    position: relative;
    border: none;
    -webkit-appearance: none;
    background-color: #fff;
    outline: none;
    width: 80px;
    height: 30px;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px $t-black1, 0 2px 4px -1px $t-black0;
    transition: 550ms ease background 200ms;
  }

  input[type="checkbox"]::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: $secondary;
    transform: scale(0.9);
    transition: 750ms ease all;
    box-shadow: 0 4px 6px -1px $t-black1, 0 2px 4px -1px $t-black0;
  }

  input:checked[type="checkbox"]::before {
    left: 52px;
    background-color: $primary;
    @keyframes middleGround {
      0% {
        transform: scale(0.9);
      }

      25% {
        transform: scale(0.3);
      }

      50% {
        transform: scale(0.5);
      }

      75% {
        transform: scale(0.9);
      }
    }
    animation: middleGround 750ms;
  }

  input:checked[type="checkbox"] {
    background-color: $secondary;
  }
}
</style>
