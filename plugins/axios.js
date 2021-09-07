export default function({ $axios }) {
  $axios.onRequest(config => {
    $nuxt.$loading.start();
  });

  $axios.onResponse(response => {
    $nuxt.$loading.finish();
  });
}
