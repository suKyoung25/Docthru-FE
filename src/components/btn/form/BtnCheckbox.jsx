import checkedIcon from "@/assets/btn/btn_checkbox_check.svg";
import nonCheckedIcon from "@/assets/btn/btn_checkbox.svg"
import Image from "next/image";


export default function BtnCheckbox ({checked}) {
    return (
        <div>
            {checked ?
                ( <Image src={checkedIcon} alt="체크된상태" width={18} height={18}/> ) :
                ( <Image src={nonCheckedIcon} alt="체크안된상태" width={18} height={18} /> )
            }
        </div>
    )
}