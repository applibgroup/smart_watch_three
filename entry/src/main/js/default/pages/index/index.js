/*
 * Copyright (C) 2020-21 Application Library Engineering Group
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


// @ts-nocheck
import ability_featureAbility from '@ohos.ability.featureAbility'
import sensor from '@system.sensor'
import fetch from '@system.fetch';
import item from '../../i18n/weather_api.json';

export default {
    data: {
        dot: "common/images/dot.png",
        partly__sunny: "common/images/partly_sunny.png",
        partly_sunny: "PARTLY SUNNY",
        point2: "common/images/dot.png",
        second: "common/images/seconds_needle.png",
        centre: "common/images/antique_midpoint.png",
        hour: "common/images/Hour_needle.png",
        minute: "common/images/Minutes_needle.png",
        point3: "common/images/dot.png",
        calories_img: "common/images/calories_icon.png",
        foots: "common/images/steps_icon.png",
        child1: "common/images/dot.png",

        weather: "",
        weather_description: "",
        notification: "Team Meeting 11am",
        min_progress_calories: '50',
        min_progress_footSteps: '65',
        btnText: "",
        mySteps: '',
        sensorPermission: false
    },
    fetchDate: function () {
        const date = new Date();
        this.date_d = (String(date.getDate()))
        this.date_m = (String(date.getMonth() + 1))
        const dayOfWeek = (date.getDay())
        const month = (date.getMonth() + 1)
        if (dayOfWeek == 1)
        this.date_w = "Mon"
        else if (dayOfWeek == 2)
        this.date_w = "Tue"
        else if (dayOfWeek == 3)
        this.date_w = "Wed"
        else if (dayOfWeek == 4)
        this.date_w = "Thu"
        else if (dayOfWeek == 5)
        this.date_w = "Fri"
        else if (dayOfWeek == 6)
        this.date_w = "Sat"
        else
        this.date_w = "Sun"

        if (month == 1)
        this.date_m = "Jan"
        else if (month == 2)
        this.date_m = "Feb"
        else if (month == 3)
        this.date_m = "Mar"
        else if (month == 4)
        this.date_m = "Apr"
        else if (month == 5)
        this.date_m = "May"
        else if (month == 6)
        this.date_m = "Jun"
        else if (month == 7)
        this.date_m = "Jul"
        else if (month == 8)
        this.date_m = "Aug"
        else if (month == 9)
        this.date_m = "Sep"
        else if (month == 10)
        this.date_m = "Oct"
        else if (month == 11)
        this.date_m = "Nov"
        else
        this.date_m = "Dec"
    },
    fetchWeather: function () {
        var dataw = JSON.stringify(item);
        let weather_api_input = JSON.parse(dataw);
        let data;
        fetch.fetch({
            url: "https://api.openweathermap.org/data/2.5/weather?lat=" + weather_api_input[0].latitude + "&lon=" + weather_api_input[0].longitude + "&appid=" + weather_api_input[0].api_key,
            responseType: "json",
            method: 'GET',
            success: function (resp) {
                data = JSON.stringify(resp);
                console.info('Weather data fetch success. Resp: ' + data);
            },
            fail: function (data, code) {
                console.log("fail data: " + JSON.stringify(data) + " fail code: " + code);
            },
            complete: () => {
                const { main } = data.weather[0];
                this.weather = main;
                this.weather_description = main;
            }
        })
    },
    fetchNotification: function () {
        let data;
        fetch.fetch({
            complete: () => {
                this.notification = data.notification;
                this.min_progress_calories = data.min_progress_calories;
                this.min_progress_footSteps = data.min_progress_footSteps;
            }
        })
    },
    onInit() {
        this.title = this.$t('strings.world');
        this.fetchDate();
        this.fetchWeather();
        this.fetchNotification();
        this.btnText = this.$t('strings.start_count');
    }
}


function verifyPermissions() {
    var context = ability_featureAbility.getContext()
    let permission = "ohos.permission.ACTIVITY_MOTION"
    var result = new Promise((resolve, reject) => {
        context.verifyPermission(permission)
            .then((data) => {
                resolve(true)
            }).catch((error) => {
            reject(false)
        })
    })
    return result
}

function subscribePedometerSensor(context) {
    sensor.subscribeStepCounter({
        success: function (ret) {
            context.mySteps = ret.steps.toString()
        },
        fail: function (data, code) {
            console.log('Subscription failed. Code: ' + code + '; Data: ' + data)
        }
    })
}

