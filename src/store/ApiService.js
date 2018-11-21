/**
 * Created by sioxa on 2016/12/25 0025.
 */
import Vue from 'vue'

import API from '../config/api'
import HTTPBase from '../utils/HTTPBase'

function apiFactory(api) {
  return (id = null) => Vue.http.jsonp(
    api.url,
    {
      params: api.params(id),
      jsonp: api.jsonp
    }
  )
}

export default {
  actions: {
    getRankSongs({}, id){
      return apiFactory(API.rank_songs)(id)
    },
    getRankList({}){
      return apiFactory(API.rank_list)()
    },
    getAlbum({}, id){
      return apiFactory(API.album)(id)
    },
    getSingerInfo({}, id){
      return apiFactory(API.singer_info)(id)
    },
    search({}, key){
      return apiFactory(API.search)(key)
    },
    getHotKey({}){
      return apiFactory(API.hotkey)()
    },
    getRecommands({}){
      return apiFactory(API.first_page_data)()
    },
    getCdList({},id){
        // return Vue.http.post('http://182.61.17.242:8080/index/get',
        // {
        //     method: 'get',
        //     url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        //     param: "{type:1,json:1,utf8:1,onlysong:0,disstid:5621441894,format:'jsonp',g_tk:1953711265,jsonpCallback:'playlistinfoCallback',loginUin:2880161622,hostUin:0,format:'jsonp',inCharset:'utf8',outCharset:'utf-8',notice:0,platform:'yqq',needNewCode:0}",
        //     header: "{referer: 'https://c.y.qq.com/',host: 'c.y.qq.com'}"
        // })
        return HTTPBase.get('http://182.61.17.242:8080/index/get',
        {
            method: 'get',
            url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
            param: "{type:1,json:1,utf8:1,onlysong:0,disstid:5621441894,format:'jsonp',g_tk:1953711265,jsonpCallback:'playlistinfoCallback',loginUin:2880161622,hostUin:0,format:'jsonp',inCharset:'utf8',outCharset:'utf-8',notice:0,platform:'yqq',needNewCode:0}",
            header: "{referer: 'https://c.y.qq.com/',host: 'c.y.qq.com'}"
        },
        {
            'Access-Control-Allow-Origin': '*'
        })
    //   return apiFactory(API.cd)(id)
    },
    getLyric({},id){
      return Vue.http.jsonp('https://api.darlin.me/music/lyric/'+id+'/',{
        jsonp:'callback'
      })
    }
  }
}
