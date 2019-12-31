//% color="#ff6600" weight=20 icon="\uf085"
namespace muvision {
    // export enum VisionType {
    //     //% block="🌈 Color Block"
    //     VISION_COLOR_DETECT=1,
    //     //% block="🌈 Color Recognition"
    //     VISION_COLOR_RECOGNITION=2,
    //     //% block="⚽ Ball Detect"
    //     VISION_BALL_DETECT=3,
    //     //% block="👥 Body Detect"
    //     VISION_BODY_DETECT=5,
    //     //% block="🔳 Shape Card"
    //     VISION_SHAPE_CARD_DETECT=6,
    //     //% block="🔳 Traffic Card"
    //     VISION_TRAFFIC_CARD_DETECT=7,
    //     //% block="🔳 Number Card"
    //     VISION_NUM_CARD_DETECT=8
    // }
    export enum VisionType {
        //% block="🌈 Color Block"
        VisionColorBlockDetect=1,
        //% block="⚽ Ball Detect"
        VisionBallDetect=3,
        //% block="👥 Body Detect"
        VisionBodyDetect=5,
        //% block="🔳 Shape Card"
        VisionShapeCardDetect=6,
        //% block="🔳 Traffic Card"
        VisionTrafficCardDetect=7,
        //% block="🔳 Number Card"
        VisionNumCardDetect=8
    }
    export enum CardType {
        //% block="🔳 Shape Card"
        VisionShapeCardDetect=6,
        //% block="🔳 Traffic Card"
        VisionTrafficCardDetect,
        //% block="🔳 Number Card"
        VisionNumCardDetect
    }
    export enum TrafficCardType {
        //% block="⬆ Forward"
        TrafficCardForward=1,
        //% block="⬅ Left"
        TrafficCardLeft,
        //% block="➡ Right"
        TrafficCardRight,
        //% block="🔙 Turn Around"
        TrafficCardTURN_AROUND,
        //% block="🅿️ Park"
        TrafficCardPark
    }
    export enum ShapeCardType {
        //% block="✔ Tick"
        ShapeCardTick=1,
        //% block="✖ Cross"
        ShapeCardCross,
        //% block="⭕ Circle"
        ShapeCardCircle,
        //% block="◻ Square"
        ShapeCardSquare,
        //% block="🛆 Triangle"
        ShapeCardTriangle
    }
    export enum ColorType {
        //% block="black"
        Black=1,
        //% block="white"
        White,
        //% block="red"
        Red,
        //% block="yellow"
        Yellow,
        //% block="green"
        Green,
        //% block="cyan"
        Cyan,
        //% block="blue"
        Blue,
        //% block="purple"
        Purple,
        //% block="others"
        Unkown=0
    }
    export enum NumCardType {
        //% block="1"
        NumCard1=1,
        //% block="2"
        NumCard2,
        //% block="3"
        NumCard3,
        //% block="4"
        NumCard4,
        //% block="5"
        NumCard5,
        //% block="6"
        NumCard6,
        //% block="7"
        NumCard7,
        //% block="8"
        NumCard8,
        //% block="9"
        NumCard9,
        //% block="0"
        NumCard0=0,
    }
    export enum Params {
        //% block="horizontal"
        Horizontal=1,
        //% block="vertical"
        Vertical,
        //% block="width"
        Width,
        //% block="height"
        Height,
        //% block="label"
        Lable
    }
    export enum ColorParams {
        //% block="red channel"
        RedChannal=6,
        //% block="green channel"
        GreenChannal=7,
        //% block="blue channel"
        BlueChannal=8,
        //% block="label"
        Label=5
    }

    /**
     * get vision status
     * @param id MU id
     * @param type vision type
     */
    //% blockId=mu3_detected block="%id|detected%type" color="#2E8B57"
    //% weight=79
    //% group="Functions"
    export function detected(id:MuId, type:MuVsMessageVisionType):boolean{
        return muvision.getValue(id, type, MuVsObjectInf.kStatus) ? true:false
    }
    let x_last = -1;
    let y_last = -1;
    //% blockId=mu3_color_rcg_detected block="%id|recognized coordinate|x =%x|y =%y|color" color="#2E8B57"
    //% x.min=0 x.max=100 x.defl=50
    //% y.min=0 y.max=100 y.defl=50
    //% group="Functions"
    export function colorRcgDetected(id:MuId,x:number,y:number):boolean{
        x = x>100 ? 100:(x<0 ? 0:x);
        y = y>100 ? 100:(y<0 ? 0:y);
        if (x != x_last) {
            x_last = x;
            muvision.write(id, MuVsMessageVisionType.kVisionColorRecog, MuVsObjectInf.kXValue, x);
        }
        if (y != y_last) {
            y_last = y;
            muvision.write(id, MuVsMessageVisionType.kVisionColorRecog, MuVsObjectInf.kYValue, y);
        }
        return muvision.getValue(id, MuVsMessageVisionType.kVisionColorRecog, MuVsObjectInf.kStatus) ? true:false
    }
    let label_last = -1;
    //% blockId=mu3_get_color_block_detect block="%id|detected%color|color block" color="#2E8B57"
    //% group="Functions"
    export function colorBlockDetected(id:MuId,label:ColorType):boolean{
        if (label_last != label) {
            label_last = label;
            muvision.write(id, MuVsMessageVisionType.kVisionColorDetect, MuVsObjectInf.kLabel, label)
        }
        return muvision.getValue(id, MuVsMessageVisionType.kVisionColorDetect, MuVsObjectInf.kStatus) ? true:false
    }
    //% block="get%id|algorithm%type|%item|value" color="#2E8B57"
    //% group="Functions"
    export function visionValue(id: MuId, type: VisionType, item: Params): number {
        return muvision.getValue(id, <number>type, <number>item)
    }
    //% block="get%id|algorithm 🌈 Color Recognition|%item" color="#2E8B57"
    //% group="Functions"
    export function colorRcgValue(id:MuId,item:ColorParams):number{
        return muvision.getValue(id, MuVsMessageVisionType.kVisionColorRecog, <number>item)
    }
    //% blockId=mu3_shape_card_type block="get%id|algorithm 🔳 Shape Card|type =%type" color="#2E8B57"
    //% group="Functions"
    export function shapeCardType(id:MuId,type:ShapeCardType):boolean{
        return muvision.getValue(id, MuVsMessageVisionType.kVisionShapeCard, MuVsObjectInf.kLabel) == type
    }
    //% blockId=mu3_traffic_card_type block="get%id|🔳 Traffic Card|type =%type" color="#2E8B57"
    //% group="Functions"
    export function trafficCardType(id:MuId,type:TrafficCardType):boolean{
        return muvision.getValue(id, MuVsMessageVisionType.kVisionTrafficCard, MuVsObjectInf.kLabel) == type
    }
    //% blockId=mu3_number_card_type block="get%id|🔳 Number Card|type =%type" color="#2E8B57"
    //% group="Functions"
    export function numberCardType(id:MuId,type:NumCardType):boolean{
        return muvision.getValue(id, MuVsMessageVisionType.kVisionNumberCard, MuVsObjectInf.kLabel) == type
    }
    //% blockId=mu3_color_rcg_type block="get%id|🌈 Color Recognition color =%color" color="#2E8B57"
    //% group="Functions"
    export function colorRecognizeType(id:MuId,color:ColorType):boolean{
        return muvision.getValue(id, MuVsMessageVisionType.kVisionColorRecog, MuVsObjectInf.kLabel) == color;
    }
    let gesture = 0;
    //% blockId=mu3_gesture_detect block="%id|light sensor|is detected gesture" color="#ff6600"
    //% group="Light Sensor"
    export function gestureDetect(id:MuId):boolean{
        gesture = muvision.lsReadGesture(id);
        return gesture ? true:false;
    }
    //% blockId=mu3_gesture_type block="%id|light sensor|get gesture =|%MuVsLsGesture" color="#ff6600"
    //% group="Light Sensor"
    export function gestureType(id:MuId, type:MuVsLsGesture):boolean{
        return gesture == type;
    }
}
