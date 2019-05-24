<template>
  <footer class="footer">
    <div class="container">
      <div class="row footer-top">
        <div class="col-sm-5 col-lg-5">
          <p class="padding-top-xsm">{{ description }}</p>

          <div class="text-md">
            <a v-for="item in contacts" v-title="item.title" :href="item.link" :style="contactStyle" target="_blank">
              <i :class="`fa fa-${item.icon}`"></i>
            </a>
          </div>

          <br>

          <span v-html="designer"></span>
        </div>

        <div class="col-sm-6 col-lg-6 col-lg-offset-1">
          <div class="row">
            <div class="col-sm-4">
              <h4>{{ sponsor.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in sponsor.list">
                  <a :href="item.link" target="_blank">
                    <img v-title="item.title" :src="item.logo" :alt="item.title" class="footer-sponsor-link" width="98">
                  </a>
                </li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ statistics.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in statistics.list">{{ item.title }}: {{ item.description }}</li>
              </ul>
            </div>

            <div class="col-sm-4">
              <h4>{{ other.title }}</h4>

              <ul class="list-unstyled">
                <li v-for="item in other.list">
                  <a :href="item.link" :title="item.title" target="_blank">
                    <i :class="`fa fa-${item.icon}`"></i> {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
// 引入 title.js 的默认值
import title from '@/directives/title'

export default {
  name: 'TheFooter',
  // 添加 directives 选项，并注册 title
  directives: {
    title
  },
  data() {
    return {
      description: 'VuejsCaff  Vue.js 社区',
      contacts: [
        {
          icon: 'envelope',
          title: '反馈问题 : 2514430140@qq.com',
          link: '2514430140@qq.com'
        },
        {
          icon: 'weibo',
          title: '站长微博',
          link: ''
        },
        {
          icon: 'weixin',
          title: '加我微信:xwydbjry',
          link: ''
        }
      ],
      contactStyle: {
        paddingRight: '8px'
      },
      designer: `
        <span style="font-size:0.9em">Designed by
          <span style="color: #e27575;font-size: 14px;">❤</span>
          <a href="https://github.com/naisimemeda"target="_blank"style="color:inherit">Nice</a>
        </span>
      `,
      sponsor: {
        title: '推荐应用',
        list: [
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/bQawWl3vT5dc2lYx5JZ7.png',
            title: 'UCloud',
            link: 'http://www.ucloud.cn/?utm_source=zanzhu&utm_campaign=phphub&utm_medium=display&utm_content=yejiao&ytag=phphubyejiao'
          },
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/yGLIR0idW7zsInjsNmzr.png',
            title: 'CDN 七牛',
            link: 'http://www.qiniu.com/?utm_source=phphub'
          },
          {
            logo: 'https://lccdn.phphub.org/uploads/banners/JpTCK6OKYBIrBIWdtob8.png',
            title: '订阅邮件',
            link: 'http://www.sendcloud.net/'
          }
        ]
      },
      statistics: {
        title: '统计信息',
        list: [
          {
            title: '社区会员',
            description: '22889'
          },
          {
            title: '话题数',
            description: '7397'
          },
          {
            title: '评论数',
            description: '39375'
          }
        ]
      },
      other: {
        title: '其他信息',
        list: [
          {
            icon: 'thumbs-up',
            title: 'QQ:2514430140',
            link: ''
          },
          {
            icon: 'globe',
            title: 'VX:xwydbjry',
            link: ''
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
a:hover, a:focus { color: #e27575; transition: color .15s;}
</style>
