export const MessageUI = ({message}) => {
  return (
    <>
      {message && (
        message.status === 200 ? (
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-teal-500">
            {message.message}
          </p>
        ) : (
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-orange-500">
            {message.message}
          </p>
        )
      )}
    </>
  );
}
