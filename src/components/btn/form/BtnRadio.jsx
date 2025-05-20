import clickedRadio from "@/assets/btn/btn_radio_click.svg";
import nonClickedRadio from "@/assets/btn/btn_radio.svg"
import Image from "next/image";


export default function BtnRadio ({clicked}) {
    return (
        <div>
            {clicked ?
                ( <Image src={clickedRadio} alt="클릭된상태" width={18} height={18}/> ) :
                ( <Image src={nonClickedRadio} alt="클릭안된상태" width={18} height={18} /> )
            }
        </div>
    )
}