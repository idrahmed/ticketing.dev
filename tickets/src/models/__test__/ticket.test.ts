import { Ticket } from "../ticket";

it("implements optimistic concurrency control", async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: "game",
    price: 50,
    userId: "123",
  });

  // save the ticket to the db
  // our plugin should have also implemented a version for the ticket.
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  // make 2 sepatate changes to the tickets we fetched
  firstInstance?.set({ price: 70 });
  secondInstance?.set({ price: 100 });

  // save the first fetched ticket
  await firstInstance?.save();

  // save the second fetched ticket and expect an error because it has an outdated version
  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({
    title: "game",
    price: 50,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
});
