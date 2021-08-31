import { getRoomDetails } from "../../../redux/actions/roomActions";
import { wrapper } from "../../../redux/store";
import Layout from "../../components/layout/Layout";
import RoomDetails from "../../components/room/RoomDetails";

export default function RoomDetailsPage() {
  return (
    <Layout>
      <RoomDetails />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ req, params, store }) => {
    await store.dispatch(getRoomDetails(req, params.id));
  }
);
