export default {
    data: {
        dot: "common/images/dot.png",
        partly__sunny:"common/images/partly_sunny.png",
        partly_sunny:"PARTLY SUNNY",
        point2:"common/images/dot.png",
        second:"common/images/seconds_needle.png",
        centre:"common/images/antique_midpoint.png",
        hour:"common/images/Hour_needle.png",
        minute:"common/images/Minutes_needle.png",
        point3:"common/images/dot.png",
        calories_img:"common/images/calories_icon.png",
        foots:"common/images/steps_icon.png",
        child1:"common/images/dot.png",



    },
    fetchDate : function(){
        const date = new Date();
        this.date_d=(String(date.getDate()))
        this.date_m=(String(date.getMonth()+1))
        const dayOfWeek = (date.getDay())
        const month=(date.getMonth()+1)
        if (dayOfWeek==1)
        this.date_w="Mon"
        else if (dayOfWeek==2)
        this.date_w="Tue"
        else if (dayOfWeek==3)
        this.date_w="Wed"
        else if (dayOfWeek==4)
        this.date_w="Thu"
        else if (dayOfWeek==5)
        this.date_w="Fri"
        else if (dayOfWeek==6)
        this.date_w="Sat"
        else
        this.date_w="Sun"

        if (month==1)
        this.date_m="Jan"
        else if (month==2)
        this.date_m="Feb"
        else if (month==3)
        this.date_m="Mar"
        else if (month==4)
        this.date_m="Apr"
        else if (month==5)
        this.date_m="May"
        else if (month==6)
        this.date_m="Jun"
        else if (month==7)
        this.date_m="Jul"
        else if (month==8)
        this.date_m="Aug"
        else if (month==9)
        this.date_m="Sep"
        else if (month==10)
        this.date_m="Oct"
        else if (month==11)
        this.date_m="Nov"
        else
        this.date_m="Dec"
    },
    onInit() {
        this.title = this.$t('strings.world');
        this.fetchDate();
    }
}
