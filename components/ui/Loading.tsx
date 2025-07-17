

const Loading = () => {
  return (    
    <div className="flex justify-center items-center space-x-2">
  <div className="w-1 h-1 bg-black rounded-full animate-bounce"></div>
  <div className="w-1 h-1 bg-black rounded-full animate-bounce delay-100"></div>
  <div className="w-1 h-1 bg-black rounded-full animate-bounce delay-200"></div>
</div>
  )
}

export default Loading



