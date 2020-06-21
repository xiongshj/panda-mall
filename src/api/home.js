import { request } from '@/utils/request'

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
