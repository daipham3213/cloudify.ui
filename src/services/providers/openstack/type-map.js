import * as os from "../openstack";

const TypeMap = {
  [os.Router.type]: os.Router,
  [os.Volume.type]: os.Volume,
  [os.Port.type]: os.Port,
  [os.Keypair.type]: os.Keypair,
  [os.Network.type]: os.Network,
  [os.LoadBalancer.type]: os.LoadBalancer,
  [os.SecurityGroup.type]: os.SecurityGroup,
  [os.Subnet.type]: os.Subnet,
  [os.Server.type]: os.Server,
};

export { TypeMap };
