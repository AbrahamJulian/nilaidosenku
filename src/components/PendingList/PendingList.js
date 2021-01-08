import React from "react";
import Pending from "../Pending/Pending";
import { XMasonry, XBlock } from "react-xmasonry";

function PendingList({ pendings, approvePending, deletePending }) {
  return (
    <XMasonry maxColumns="4" responsive="true">
      {pendings.length
        ? pendings.map((pending) => (
            <XBlock width={1} className="card" key={pending.id}>
              <Pending
                pending={pending}
                approvePending={approvePending}
                deletePending={deletePending}
              />
            </XBlock>
          ))
        : null}
    </XMasonry>
  );
}
export default PendingList;
