<template>
    <div class="fallback">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>

.fallback {
    width: 320px;
    height: 400px;
    border-radius: 10px;
    overflow: hidden;
    background-color: rgb(235, 235, 235);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 5px solid #cfd8dc;
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: 1s loading;
  animation-iteration-count: 10;
}


@keyframes loading {
  0%{
    transform: rotate(0deg);
  }

  100%{
    transform: rotate(360deg);
  }
}

</style>