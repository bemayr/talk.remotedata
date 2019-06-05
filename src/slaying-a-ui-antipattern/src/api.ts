import { Chance } from "chance";
import { RemoteData, Success, Failure } from './remote-data';

export async function calculateCorrelation(): Promise<number> {
  const chance: Chance.Chance = new Chance();

  // simulate latency
  await new Promise(resolve =>
    setTimeout(resolve, chance.integer({ min: 300, max: 1500 }))
  );

  // simulate 500's
  if (chance.bool()) {
    throw new Error("Something unexpected happened...");
  } else {
    return chance.floating({ min: 0.1, max: 0.6 });
  }
}

export async function withRemoteHandling<T>(
  apiCall: () => Promise<T>
): Promise<RemoteData<string, T>> {
  try {
    return new Success(await apiCall());
  } catch (error) {
    return new Failure(error.message);
  }
}
