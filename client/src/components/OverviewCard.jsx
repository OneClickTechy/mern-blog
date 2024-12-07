import { FaArrowUp } from "react-icons/fa"

const OverviewCard = ({title, totalCount, lastMonth, icon:Icon, iconColor}) => {
  return (
    <div className="flex gap-2 justify-between p-2 border border-gray-300 dark:border-gray-800 rounded-md">
    <div className="flex flex-col min-w-[180px]">
        <h1 className="text-xl whitespace-nowrap">{title}</h1>
        <p className="text-3xl">{totalCount}</p>
        <div className="flex flex-nowrap gap-2 text-sm">
            <span className="flex flex-nowrap items-center text-green-500 dark:text-green-400"><FaArrowUp className="mr-1"/>{lastMonth}</span>
            <span>Last month</span>
        </div>
    </div>
    <div>
        <div className={`${iconColor} p-2 mr-4 mt-1 rounded-full text-white dark:text-gray-900`}>
            <Icon size={26} />
        </div>
    </div>
</div>
  )
}

export default OverviewCard