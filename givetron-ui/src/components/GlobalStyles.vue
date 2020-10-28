<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
a {
  text-decoration: none;
}

#app {
  font-family: sf, Helvetica;
}

.d-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-col {
  flex-direction: column;
}

.font-sf {
  font-family: sf;
}

.font-sfbold {
  font-family: sfbold;
}

input[type='checkbox'] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  height: 30px;
  width: 52px;
  border-radius: 16px;
  display: inline-block;
  position: relative;
  margin: 0;
  border: 2px solid #999999;
  background: #999999;
  transition: all 0.2s ease;

  &:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }

  &:checked {
    border-color: #1C73F5;
    background: linear-gradient(180deg, #1C73F5 0%, #4389F1 100%);

    &:after {
      transform: translatex(23px);
    }
  }
}
</style>
