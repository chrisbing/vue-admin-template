/* eslint-disable no-unused-vars */
/* global MOCK */
/* eslint-enable no-unused-vars */
/**
 * network api
 *
 */

// const MOCK = true // remove '//' to enable Mock data

// all api path goes here
export const API_POST_LIST = 'posts'

import axios from 'axios'
import {useInterceptors, config as saleConfig} from './saleApi'

if (MOCK) {
    const Mock = require('../libs/mock').Mock
    const mockRouter = require('./mock-router')
    const mock = Mock(mockRouter, {logLevel: 'debug'})
    saleConfig.adapter = function (request) {
        return new Promise(resolve => mock(request, resolve))
    }
}

export const net = axios.create(saleConfig)
useInterceptors(net)

/**
 *
 * @returns {AxiosPromise}
 */
export function getPostList() {
    return net.get(API_POST_LIST)
}