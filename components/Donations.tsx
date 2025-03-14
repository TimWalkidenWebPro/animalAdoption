
import DonationsModalSuccess from "./Modals/DonationsModalSuccess";
import DonationsModalFail from "./Modals/DonationsModalFail";
import DonationForm from "@/components/Forms/DonationForm";
import {handleRichText} from "@/lib/utils";

type PageProps = {
  blok: {
    Heading: object;
    Content: string;
    Image: {
      filename: string
    };
  }
};

const Donations = (props:PageProps) => {
  return (
    <div
      className={`bg-right bg-no-repeat my-36  sm:min-h-[27rem] min-h-[34rem]`}
      style={{backgroundImage: `url('${props.blok.Image.filename}')`}}
      id="donate"
    >
      <DonationsModalSuccess />
      <DonationsModalFail />
      <div className="bg-black bg-opacity-90 lg:bg-opacity-100 lg:w-1/2 w-full p-6 sm:min-h-[27rem] min-h-[34rem] absolute" />
      <div className="max-w-6xl mx-4 xl:mx-auto py-10 relative flex lg:block flex-col items-center justify-center">
        <h2 className="font-bold text-3xl text-white" dangerouslySetInnerHTML={{__html: handleRichText(props.blok.Heading)?.__html ?? ""}} />
        <p className="my-4 text-white">{props.blok.Content}</p>
        <DonationForm />
      </div>
    </div>
  );
};

export default Donations;
