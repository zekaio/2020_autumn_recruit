var router = new VueRouter({routes:[

    {path: '/', component:{template:'#temp-main'}},

    {path: '/success/:mode', component:{
      template:'#temp-success',
      computed: {
        successTitle: function() {
          var title;
          if(this.$route.params.mode=='sign'){title = '报名成功'}
          else if(this.$route.params.mode=='modify'){title = '修改成功'}
          return title;
        }
      },
    }},
    
    {path: '/form/:mode', component:{
      template:'#temp-form',
      data:function() {return {
        name:'',
        sex:'',
        grade:'',
        college:'',
        dormitory:'',
        tel:'',
        first:'',
        second:'',
        adjust:'',
        description:'',
        dataCollege:['机械与汽车工程学院','建筑学院','土木与交通学院','电子与信息学院','材料科学与工程学院','化学与化工学院','轻工与食品学院','数学学院','经济与贸易学院','自动化科学与工程学院','计算机科学与工程学院','电力学院','生物科学与工程学院','环境科学与工程学院','软件学院','工商管理学院','公共管理学院','外国语学院','法学院','知识产权学院','新闻与传播学院','艺术学院','体育学院','设计学院','物理与光电学院','医学院','分子科学与工程学院','微电子学院','吴贤能智能工程学院','轻工科学与工程学院','食品科学与工程学院'],
        realIntention:['技术部','视觉设计部','视频部']
      }},
      computed: {
        dataSend: function(){
          var data = new Object();
          for(i=0; i<=9; i++) {
            data[Object.keys(this.$data)[i]] = Object.values(this.$data)[i];
          }
          return data;
        },
        formTitle: function() {
          var title;
          if(this.$route.params.mode=='sign'){title = '报名表'}
          else if(this.$route.params.mode=='modify'){title = '个人信息修改'}
          return title;
        },
        formBtn: function() {
          var btn;
          if(this.$route.params.mode=='sign'){btn = 'img/signup.png'}
          else if(this.$route.params.mode=='modify'){btn = 'img/comfirm.png'}
          return btn;
        }
      },
      methods: {
        postSign() {
          post(url='/user',postObj=this.$data.userData);
        },
        validation() {
          for(i in this.$data) {
            if(this.$data[i]=='') {
              newAlert('所有的表单项都是必填的，有表单为空，请检查~');
              return false;
            }
          }
          if(this.$route.params.mode=='sign') {
            this.sendForm();
          }
          else if(this.$route.params.mode=='modify') {
            this.sendModify();
          }
        },
        sendForm() {
          function sendSuccess() {
            switch(xhr.status){
              case 200:
                router.push('/success/sign');
              break;
              case 400:
                newAlert('报名失败，手机号错误或是其他参数错误');
              break;
              case 409:
                newAlert('报名失败，手机号已被注册');
              break;
            }
          }
          post('/user',this.dataSend,sendSuccess);
        },
        sendModify() {
          function sendSuccess() {
            switch(xhr.status){
              case 200:
                newAlert('修改成功！');
                router.push('/');
              break;
              case 404:
                newAlert('修改失败，手机号错误或是姓名错误');
              break;
            }
          }
          put('/user',this.dataSend,sendSuccess);
        }
      },
      mounted() {
        if(this.$route.params.mode=='modify') {
          var query = this.$route.query;
          this.name = query.name;
          this.sex = query.sex;
          this.grade = query.grade;
          this.college = query.college;
          this.dormitory = query.dormitory;
          this.tel = query.tel;
          this.first = query.first;
          this.second = query.second;
          this.adjust = query.adjust;
          this.description = query.description;
        }
      },
      watch: {
        tel:function() {
          if(this.tel.length != 11 || this.tel[0]!=1) {
            newAlert('手机号不合法');
            this.tel='';
          }
        },
        second:function() {
          if(this.second==this.first) {
            newAlert('虽然很想实现这个志愿，但两个志愿不能重复哦~');
            this.second='';
          }
         }
      }
    }},

    {path: '/introduce', component:{
      template:'#temp-introduce',
      data:function() {return {
        curDepId:0,
        dataDeps: [{depName:'行政人事部',
depDescription:'<p>作为百步梯的元老部门，我们是百步梯所有大型活动的基础，管理着百步梯内部的物资、财务、行政、人力。我们统筹管理办公室，分配梯内物资；我们是百步梯的财政管家，保障一切活动经费；我们是百步梯制度的创造者与规范者，也是百步梯对外交流的枢纽；我们安排着梯内人力资源配置，负责干事的招募、选拔、培训和考核。此外，我们负责梯内大型活动的承办，招新面试由我们推动，换届大会由我们组织，经验交流会由我们见证。我们的工作为百步梯平稳高效地运作提供了必要保障。</p>'},

{depName:'广播台',
depDescription:'<p>这里是华南理工大学百步梯广播台，用声音与你分享生活。在这里，我们为每一个有播音主持梦想的你，提供一个绽放的舞台。每天下午的校园广播，荔枝fm同步直播，让你的声音温暖整个华园。现有国语、粤语、英语、汇音四大板块，我们期待你的声音。</p>'},

{depName:'技术部',
depDescription:'<p>百步梯技术部，前身为创建于2000年的w18技术团队，于2001年1月归入团委旗下从而正式成立，负责百步梯线上产品的设计、开发与维护，同时为百步梯各部门提供技术支持，致力于提升百步梯产品的用户体验。</p><p>百步梯技术部面向华工用户推出过许多重要的产品：</p><p>波板糖（工具聚合）、易百分（在线刷题）、百步梯官网、人员管理系统、w18（早期音乐网站）、etshop（早期二手市场）、网页控制系统等常驻产品；</p><p>治愈系（线上点歌互唱平台）、毕业季（毕业主题游戏）、时光胶囊（定时寄信）、爱上你主播（播音主持大赛）、雕刻时光（电影活动）、梯仔系列小游戏、线上招新页面等短期项目。</p><p>百步梯技术部下设产品设计组和代码组，产品设计组分产品和设计方向，代码组分前端和后端方向。</p><p>产品设计组负责用户研究、需求分析、原型设计、数据分析、设计交互和视觉解决方案等。</p><p>代码组负责软件开发、算法设计、性能优化、软件维护等。</p><p>这里聚集了华工三校区的网络技术爱好者，以不断提升网络技术水平和获取用户增长为目标，致力于做出服务于华工学子的更优秀的产品。</p>'},

{depName:'新媒体部',
depDescription:'<p>镜头定格，勾恒久画卷；指尖翩飞，织锦绣文章。从社会热闻到身边点滴，从名流政要到你我众人，新闻报道、摄影拾光、专访聚焦、可视漫画，不同的方式刻下你的记忆。还有意外掉落：愉悦的排版技能，不俗的运营能力，新媒体部期待与你的见面。</p>'},

{depName:'运营推广部',
depDescription:'<p>灵感于此处萌芽，创意在这里迸发，我们是百步梯的创新大脑，也是对外交流的窗户。我们通过活动推广百步梯的品牌，“雕刻时光”电影文化节、“治愈系”、“开学季”及“毕业季”文化节、新媒体大赛等引人瞩目的活动在我们手中诞生；与此同时，我们还负责百步梯线上小程序--波板糖的运营以及与外校合作联谊。如果你有丰富的创意，那么就快来加入我们运营推广部吧！</p>'},

{depName:'视觉设计部',
depDescription:'<p>我们是百步梯的美工部门，来自各个学院热爱设计的小伙伴！</p><p>我们是百步梯的幕后工作者，负责各个活动的美工工作！</p><p>在爱上你主播，雕刻时光，毕业季等系列活动中，都能见到我们的身影！</p><p>我们热爱发现美的眼睛，也热爱不一样的你！</p>'},

{depName:'视频部',
depDescription:'<p>用影像表达生活态度，用相机记录青春韶华。</p><p>视频部，是一个让你沉浸其中，也让你收获满满的地方。</p><p>我们近距离接触明星名人，深入一线拍摄现场，那些只在电视里看到过的事情，会真实地出现在你的生活里。</p><p>我们用技术实现突破，用创意追求卓越。视频出品，必属精品，这里的故事等待你来书写。</p>'}
]
      }},
      methods: {
        next() {
          if(this.curDepId!=6) {
            this.curDepId++;
          }
          else {
            this.curDepId=0;
          }
        },
        prev() {
          if(this.curDepId!=0) {
            this.curDepId--;
          }
          else {
            this.curDepId=6;
          }
        },
      },
      computed: {
        curDepName:function() {
          return this.dataDeps[this.curDepId]['depName'];
        },
        curDepDescription:function() {
          return this.dataDeps[this.curDepId]['depDescription'];
        },
      }
    }},

    {path: '/inquiry', component:{
        template:'#temp-inquiry',
        data() {return{
          dataQuery:{}
        }},
        methods: {
          toModify() {
            router.push({
              path: '/form/modify',
              query: this.dataQuery
            });
          }
        },
        mounted() {
          this.dataQuery=this.$route.query;
        },
    }},

    {path: '/login', component:{
      template:'#temp-login',
      data: function(){return{
        name:'',
        tel:''
      }},
      methods: {
        login() {
          url = '/user?tel='+this.tel+'&name='+this.name;
          function onloaded() {
            switch(xhr.status) {
              case 200:
                router.push({
                  path: '/inquiry',
                  query: JSON.parse(xhr.responseText).data
                });
                break;
              case 404:
                newAlert('好像写错信息了，别着急哦，改一下');
            }
          }
          get(url,onloaded);
        }
      },
      mounted() {
        
      },
  }},

]});

var routeVue = new Vue({
  router
}).$mount('#app');

var baseurl = 'https://zekaio.cn/2020_autumn/api';
var xhr = new XMLHttpRequest();
function get(url,onloadFun,onerrorFun) {
  xhr.open('get',baseurl + url);
  xhr.withCredentials = true;

	xhr.onload = () => {
    onloadFun();
	};
	xhr.onerror = () => {	//检测网络异常
    onerrorFun();
    newAlert('请求出错，网络异常，状态码是'+xhr.status);
	}
	xhr.send();
}

function post(url,postObj,onloadFun,onerrorFun) {
    xhr.open('post',baseurl + url, false);
		xhr.withCredentials = true;
		xhr.setRequestHeader('Content-Type','application/json');
		xhr.onload = () => {
      onloadFun();
		}
		xhr.onerror = () => {
      onerrorFun();
			newAlert('请求出错，网络异常，状态码是'+xhr.status);
		}
		xhr.send(JSON.stringify(postObj));
}

function put(url,postObj,onloadFun,onerrorFun) {
  xhr.open('put',baseurl + url, false);
  xhr.withCredentials = true;
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.onload = () => {
    onloadFun();
  }
  xhr.onerror = () => {
    onerrorFun();
    newAlert('请求出错，网络异常，状态码是'+xhr.status);
  }
  xhr.send(JSON.stringify(postObj));
}

function newAlert(text) {
	var newSpace = document.createTextNode(text);
	var newAlertFrame = document.createElement('div');
	newAlertFrame.setAttribute('class','new_alert');
	newAlertFrame.setAttribute('onclick','$(this).fadeOut("slow").remove();');
	newAlertFrame.appendChild(newSpace);
	document.getElementsByTagName('body')[0].appendChild(newAlertFrame);
	$('.new_alert').fadeIn('fast');
}