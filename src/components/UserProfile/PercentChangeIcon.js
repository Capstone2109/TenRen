import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';


const PercentChangeIcon = (props) => {

    return (
        (<span className={props.percentChange >= 1 ? "green-color" : "red-color"}>
            {props.percentChange >= 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {props.percentChangeString}
        </span>)
    )
}

export default PercentChangeIcon