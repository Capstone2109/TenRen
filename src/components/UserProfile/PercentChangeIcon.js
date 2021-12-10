import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';


const PercentChangeIcon = (props) => {

    return (
        <span className={props.percentChange >= 1 ? "green-color" : "red-color"}>
            {'('}
            {props.percentChange >= 1 ? <CaretUpOutlined /> : <CaretDownOutlined />}
            {`${(Math.abs(props.percentChange - 1) * 100).toFixed(2)} %)`}
            
        </span>
    )
}

export default PercentChangeIcon