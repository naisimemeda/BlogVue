<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">欣赏一哈</h3>
      </div>
      <div class="panel-body">
        <Slider :slides="slides">
          <template slot-scope="{ currentSlide }">
            <a :href="currentSlide.link" target="_blank">
              <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
            </a>
          </template>
        </Slider>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      // 实战课程
      slides: [
        {
          title: '哟嘿嘿',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/ZGJkNCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuvzpwYbEIoBh8ap84BsgXdnGWKvt9plUQqzX7EPQWAjLQvBlKkI2Gj43qUTWykpaU0i2DNiAzIgS9Ao583ZRjoG.jpg',
          link: 'http://img4.tuwandata.com/v3/thumb/jpg/ZGJkNCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuvzpwYbEIoBh8ap84BsgXdnGWKvt9plUQqzX7EPQWAjLQvBlKkI2Gj43qUTWykpaU0i2DNiAzIgS9Ao583ZRjoG.jpg'
        },
        {
          title: '嘻嘻',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/M2JkNSwxNzMzLDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuqpv5D6TMVTS2bhtLI08cX8rhGLWNmFJMFLTlVXZFvsLiHtbQ5SkKyyLJuSe71JsqfPzlyuoLwtGknIs8yA02Hm.jpg',
          link: 'http://img4.tuwandata.com/v3/thumb/jpg/M2JkNSwxNzMzLDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBuqpv5D6TMVTS2bhtLI08cX8rhGLWNmFJMFLTlVXZFvsLiHtbQ5SkKyyLJuSe71JsqfPzlyuoLwtGknIs8yA02Hm.jpg'
        },
        {
          title: '呲溜呲溜',
          img: 'http://img4.tuwandata.com/v3/thumb/jpg/NDI1NCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBGJIQIdVSQAIUkznpxRR2XnXOzHdXqbsUFQgiHM57R781hN5hNrfjFbN94ASvEDnaehWabI5LZK0Bs4SPt12V3UK.jpg',
          link: 'http://img4.tuwandata.com/v3/thumb/jpg/NDI1NCwxMDI0LDAsOSwzLDEsLTEsTk9ORSwsLDkw/u/GLDM9lMIBglnFv7YKftLBGJIQIdVSQAIUkznpxRR2XnXOzHdXqbsUFQgiHM57R781hN5hNrfjFbN94ASvEDnaehWabI5LZK0Bs4SPt12V3UK.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-inner img {display:block;margin:auto;line-height:1;width:70%;border:1px solid #ddd;box-shadow:0 0 10px #ccc;-moz-box-shadow:0 0 10px #ccc;-webkit-box-shadow:0 0 10px #ccc;}
</style>